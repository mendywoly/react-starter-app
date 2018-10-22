import React, { Component } from 'react';
import './App.css';
import {Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import Adapter from './components/Adapter'
import LogInForm from './components/LogInForm'
import SignUpForm from './components/SignUpForm'
import {connect} from 'react-redux'
import {setCurrentUser} from './action'
import HomeContainer from './containers/HomeContainer'

class App extends Component {
  
  componentDidMount = () => {
    Adapter.getUser().then(r=>r.json()).then(data => this.props.setCurrentUser(data))
    .catch(console.log)
  }

  render() {
    return (
      <div  >
        <Switch>
          <Route exact path="/login" component={LogInForm}/>
          <Route exact path="/signup" component={SignUpForm}/>
          {Adapter.isLoggedIn() ?    
          <React.Fragment>
            <Route exact path="/" component={HomeContainer}/>
          </React.Fragment>
          : <Redirect to="/login" /> }
        </ Switch>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser:(user) => dispatch(setCurrentUser(user))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
