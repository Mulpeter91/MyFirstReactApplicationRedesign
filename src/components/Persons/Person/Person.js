import React, { Component } from 'react';
import styles from './Person.module.css';
import withClass from '../../../hoc/WithClass';
import Aux from '../../../hoc/Auxiliary';
import PropTypes from 'prop-types'; //this is an installed package
import AuthContext from '../../../Context/auth-context';

class Person extends Component{

    //method two for isolating the last element
    constructor(props){
        super(props)
        this.inputElementRef = React.createRef();
    }    

    //this method allows classes to access the context outside of the JSX code
    //it must be called 'contextType'
    static contextType = AuthContext;

    componentDidMount() {
        //method one for isolating the last element
        //this.inputElement.focus();

        //method two for isolating the last element
        this.inputElementRef.current.focus();

        console.log(this.context.authenticated);
    }

    render(){
        // return (
        //         <div className={styles.Person}> 
        //             <p key="i1" onClick={this.props.click}>Name: {this.props.name} | Age: {this.props.age}</p>,
        //             <p key="i2">{this.props.children}</p> ,
        //             <input key="i3" type="text" onChange={this.props.changeName} value={this.props.name}/>,
        //             <p key="i4" onClick={this.props.delete}>X</p>
        //         </div>
        // );

        //this is how to can write adjacent elements. Return an array with the elements listed as item and add key values
        // return [    
        //     // <div className={styles.Person}> 
        //         <p key="i1" onClick={this.props.click}>Name: {this.props.name} | Age: {this.props.age}</p>,
        //         <p key="i2">{this.props.children}</p> ,
        //         <input key="i3" type="text" onChange={this.props.changeName} value={this.props.name}/>,
        //         <p key="i4" onClick={this.props.delete}>X</p>
        //     // </div>
        // ];

        //another method to allow for adjacent elements is to wrap it
        //aux can also be replaced with the built in <React.Fragment> or import { Fragment } and use <Fragment>
        //passing isAuth is being passed through component Persons which doesn't care about it, it's merely passing it on. this is not best practice and why React added the Context API
        return (
            <Aux> 
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please Log in </p>}                       
                <p key="i1" onClick={this.props.click}>Name: {this.props.name} | Age: {this.props.age}</p>
                <p key="i2">{this.props.children}</p> 
                <input 
                    key="i3" 
                    type="text" 
                    //method two for isolating the last element
                    ref={this.inputElementRef}
                    //method one for isolating the last element
                    //ref={(inputEl) => {this.inputElement = inputEl}}
                    onChange={this.props.changeName} 
                    value={this.props.name}/>
                <p key="i4" onClick={this.props.delete}>X</p>
            </Aux>
        );
    }
}

//this is for giving a warning when passing in incorrect properties
//though it's not throwing warnings for me evening though I'm passing a string to age ...
Person.propTypes = {
    click: PropTypes.func, 
    name: PropTypes.string, 
    age: PropTypes.number, 
    delete: PropTypes.func,
    changeName: PropTypes.func
};

export default withClass(Person, styles.Person);