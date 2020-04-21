// import React, { Component } from 'react';
import React, { PureComponent } from 'react';
import Person from './Person/Person.js';

class Persons extends PureComponent{

    // won't work without a state
    // static getDerivedStateFromProps(props, state){
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    // this is old and niche
    // componentWillReceiveProps(props){
    //     console.log('[Persons.js] componentWillReceiveProps')
    // }

    //this method is crucial for helping on performance
    //this methoid can only be accessed in classes
    //don't abuse this. In cases where the child always depends on a change to the parent it will always be true 
    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     if(nextProps.persons !== this.props.persons || 
    //         nextProps.changed !== this.props.changed || 
    //         nextProps.delete !== this.props.delete){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // PureComponent is the same as the default component but also implicitly implements the shouldComponentUpdate checks for all props. 

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message: 'Snapshot!'};
    }

    //componentWillUpdated() was also removed and shouldn't be used anymore

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    //cleanup
    componentWillUnmount(){
        console.log('[Persons.js] componentWillUnmount');
    }

    render(){
        console.log('[Persons.js] rendering ...');
        return this.props.persons.map((person, index) => {
                return (
                    <Person 
                        delete = {() => this.props.delete(index)}
                        name = {person.name}
                        age = {person.age}                    
                        changeName = {(event) => this.props.changeName(event, person.id)} 
                        key = {person.id}
                    />
                );
        });        
    }
}

export default Persons;