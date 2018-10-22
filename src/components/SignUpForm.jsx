import React, { Component } from 'react';
import { Form, Grid } from 'semantic-ui-react'
import Adapter from './Adapter'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {setCurrentUser} from '../action'

// import Progress from '../components/Progress'

class SignUpForm extends Component {

    state = {
        firstName: '', 
        lastName: '', 
        userName: '', 
        password: '',
        passwordConfirmation: '',
        companyName: '',
        errors: [],
    }
    
    handleChange = (e, {name, value}) => this.setState({ [name]: value})

    handleSubmit = (event) => {
        event.preventDefault();
        const {firstName, lastName, userName, password, companyName, passwordConfirmation } = this.state

        Adapter.signUp(firstName, lastName, userName, password, companyName)
        .then( r=> this.handleErrors(r))
        .then(d => {
            localStorage.setItem('token', d.token )
            Adapter.getUser().then(r=>r.json()).then(data => this.props.setCurrentUser(data))
            this.props.history.push('/')
        })
        .catch(error =>  {
            if(error.message === "Failed to fetch") {
                alert('Cannot reach server please try again.')
            } else {
                error.json().then(data => this.setState({errors: data.errors}))
            }
        })
        
    }

    handleErrors(response) {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    }
    

    render() {
        const {firstName, lastName, userName, password, companyName, passwordConfirmation  } = this.state

        return (        
            <div>
                <Grid columns={3}  centered  >
                <Grid.Column >
                    <br/>
                    <br/>
                <h1 style={{textAlign: 'center'}}>Rapid Suite Refunds</h1>
                <br/><br/>
                <br/><br/>
                            {this.state.errors.map( e => <li>{e}</li> )}
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Group  >
                                <Form.Input 
                                    label="First Name" 
                                    placeholder='First Name'
                                    name='firstName'
                                    onChange={this.handleChange}
                                    value={firstName}
                                />
                                <Form.Input 
                                    label="Last Name" 
                                    placeholder='Last Name' 
                                    name='lastName'
                                    onChange={this.handleChange}
                                    value={lastName}
                                />
                                 <Form.Input 
                                    label="Company Name" 
                                    placeholder='Company Name' 
                                    name='companyName'
                                    onChange={this.handleChange}
                                    value={companyName}
                                />
                            </Form.Group>
                            <Form.Group  >
                                <Form.Input 
                                    label="Username" 
                                    placeholder='Username'
                                    name='userName' 
                                    onChange={this.handleChange}
                                    value={userName}
                                />
                                <Form.Input 
                                    label="Password" 
                                    placeholder='Password' 
                                    type='password' 
                                    name='password'
                                    onChange={this.handleChange}
                                    value={password}
                                />
                                <Form.Input 
                                    label="Password Confirmation" 
                                    placeholder='Password Confirmation' 
                                    type='password' 
                                    name='passwordConfirmation'
                                    onChange={this.handleChange}
                                    value={passwordConfirmation}
                                />
                            </Form.Group>
                            <Form.Button content='Submit' />
                        </Form>
                    </Grid.Column>
                </Grid>

            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
      setCurrentUser:(user) => dispatch(setCurrentUser(user))
    }
  }

export default connect(null, mapDispatchToProps)(SignUpForm);
