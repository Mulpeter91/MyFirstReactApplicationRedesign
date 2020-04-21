import React, { useEffect, useRef, useContext } from 'react';
import Styles from './Cockpit.module.css';
import AuthContext from '../../Context/auth-context.js';

// UseEffect is a React hook that combines the use cases of class based lifecycle hooks to functions

const Cockpit = props => {

    //adding a ref with hooks for functional component
    const toggleButtonRef = useRef(null); 

    //this is how functional components access context outside JSX
    const authContext = useContext(AuthContext);

    //clicking the button here will break because the JSX hasn't had a chance to run yet. We do know that useEffect is run AFTER the render cycle though
    //toggleButtonRef.current.click();

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        //Http request ...
        // const timer = setTimeout(() => {
        //     alert('Saved data to cloud!');
        // },1000);
        toggleButtonRef.current.click();
        //This return is optional. It runs BEFORE the main useEffect functions run, but AFTER the first render cycle. 
        return () => {
            //clearTimeout(timer);
            console.log('[Cockpit.js] clean up work in useEffect');
        };
    }, [props.persons]); //adding this array means the 'saved data' will only occur when the persons object has changed.
    //passing an empty array [] tells the useEffect there's no dependencies to change so it will only run once. 
    
    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work 2nd useEffect');
        };
    });

    // can use useEffect multiple times

    const assignedClasses = [];
    let btnClass = '';

    if(props.showPersons){
        btnClass = Styles.Red;
    }

    if (props.personsLength <= 2){
      assignedClasses.push(Styles.red);
    }
    if(props.personsLength <= 1){
      assignedClasses.push(Styles.bold);
    }

    return (
        <div className={Styles.cockpit}>
            <h1>{props.title}</h1>          
            <p className={assignedClasses.join(' ')}>This is a list of Objects for Redesign</p>
            <button 
                ref={toggleButtonRef}
                className={btnClass}
                onClick={props.toggle}>
                Toggle Persons
            </button>  
            <AuthContext.Consumer>
                {(context) => <button onClick={props.login}>Log in</button>}
            </AuthContext.Consumer>            
        </div>
    );
};

//technique where the component is stored and only when the input changes will the component re-render. 
//this is how you can control the update for functional components
//if the parent wants the component again but without changes then React will pass up that stored component
export default React.memo(Cockpit);