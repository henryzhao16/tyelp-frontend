import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from "axios/index";
// import '../styles/login.css';

class Register extends Component {

    constructor(props) {
        super(props);


    this.state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        redirectToReferrer: false
    };

    this.register = this.register.bind(this);
    this.onChange = this.onChange.bind(this);

    }

    register() {
        if(this.state.username && this.state.password && this.state.firstName && this.state.lastName){
          var self = this;
          var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password
          };
          axios({
            method: 'post',
            url: 'http://localhost/project/api/register',
            headers: {
              "Content-Type": "application/json"
            },
            data
          }).then(function(response) {
            console.log('User Registered');
            console.log(response);
            self.setState({redirectToReferrer: true});
          }).catch(function(error) {
            console.log('Error in Registration');
            self.setState({status: error.response.status});  // 401
          });
        }
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/query'}/>)
        }



        return (

            <div className="row " id="Body">
                <div className="medium-5 columns left">
                    <h4>Register</h4>
                    <label>Email</label>
                    <input type="text" name="username"  placeholder="Email" onChange={this.onChange}/>
                    <label>First Name</label>
                    <input type="text" name="firstName"  placeholder="First Name" onChange={this.onChange}/>
                    <label>Last Name</label>
                    <input type="text" name="lastName"  placeholder="Last Name" onChange={this.onChange}/>
                    <label>Password</label>
                    <input type="password" name="password"  placeholder="Password" onChange={this.onChange}/>

                    <input type="submit" className="button" value="Register" onClick={this.register}/>
                    <a href="/login">Login</a>
                </div>

            </div>
        );
    }
}

export default Register;