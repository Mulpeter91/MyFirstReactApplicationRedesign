import React, {Component} from 'react';
import classes from './App.module.css'; 
import Persons from '../components/Persons/Persons.js';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass.js';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../Context/auth-context';

class App extends Component {

  //when including the constructor of an extended class you also need to call the parent constructor
  constructor(props){
    super (props);
    console.log('[App.js] constructor')
  }

  //this can be called in the constructor also
  //but that a more modern approach
  state = {
    persons: [
      { id: '1', name: 'Timmy', age: 28 }, 
      { id: '2', name: 'Rob', age: 29}, 
      { id: '3', name: 'Mimmo', age: 40}, 
      { id: '4', name: 'Robbie', age: 70}
    ], 
    showPersons: false, 
    showCockpit: true, 
    changeCounter: 0, 
    authenticated: false
  };

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  // returning false will block the update of the component
  shouldComponentUpdate(){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }

  nameChangedHandler = (event, id) => {    
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    //important to note:
    //you call set state synchronously here but it's not guaranteed to run right away
    //React holds it and when it has memory free to excute it will then trigger that change, which in turn triggers the render lifecycle
    //The problem with this approach is that on large apps or multiple set state calls this delay may cause you to get an out of date state or something you weren't expecting
    //this approach is fine when what you're updating doesn't depend on the previous state, ie persons. It is a problem when it does depend on the old state, ie counter. 
  //   this.setState({
  //     persons: persons, 
  //     changeCounter: this.state.changeCounter + 1});
  // };

  //by turning it to an arrow function and passing the previous state you can over come this issue of out of date state
    this.setState((prevState, props) => {
      return {
        persons: persons, 
        changeCounter: prevState.changeCounter + 1
      };
    }); 
  };

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };

  loginHandler = () => {
    this.setState({authenticated: true})
  }

  // render doesn't immediately push HTML to the browers. 
  // what it's doing it rendering the virtual dom stored in it's memory
  // this is then compared against the old virtual dom and check for differences
  // if changes are found, it then reaches out to the real dom and updates it only where changes have occurred. 
  // if no differences were found, despite render stil being executed, nothing would be pushed to the real dom. 
  render(){
    console.log('[App.js] rendering ...');
    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
            <h4>Persons List</h4>
            <Persons 
              persons={this.state.persons}
              delete={this.deletePersonHandler}
              changeName={this.nameChangedHandler}
              isAuthenticated={this.state.authenticated}
            />            
          </div>
      );
    }

    return (
        // <div className={classes.App}>   
        <Aux>
        <button onClick={() => {this.setState({showCockpit: false});}}>
          Remove Cockpit
        </button>  
        <AuthContext.Provider 
          value={{            
            authenticated: this.state.authenticated, 
            login: this.loginHandler
          }}>
          { this.state.showCockpit ? (
            <Cockpit
                  title={this.props.title}
                  showPersons={this.state.showPersons}
                  personsLength={this.state.persons.length}
                  login={this.loginHandler}
                  toggle={this.togglePersonsHandler}
            />   
            ) : null }
          {persons}  
        </AuthContext.Provider>
        </Aux>
        // </div>
    );
  }  
}

//another higher order component
export default withClass(App, classes.App);
