import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
// import '../styles/login.css';
import * as actions from '../store/actions/app.actions';
// import Store from '../store/store';

// This should be a container
class Login extends Component {
    constructor(){
        super();

        this.state = {
            username: '',
            password: '',
            userID: '',
            redirectToReferrer: false,
            status: 200
        };

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    login() {
        if(this.state.username && this.state.password){
          var self = this;
          var data = {
            username: this.state.username,
            password: this.state.password
          };
          axios({
            method: 'post',
            url: 'http://localhost/project/api/login',
            headers: {
              "Content-Type": "application/json"
            },
            data
          }).then(function(response) {
            console.log('Authenticated');
            var parse = JSON.parse(response.data);
            //console.log(parse['user_id']);
            self.setState({redirectToReferrer: true});
            self.setState({userID: parse['user_id']});
          }).catch(function(error) {
            console.log('Error on Authentication');
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
            <div className="row" id="Body">
                <div className="medium-5 columns left">
                    <h4>Login</h4>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Username" onChange={this.onChange}/>
                    <label>Password</label>
                    <input type="password" name="password"  placeholder="Password" onChange={this.onChange}/>
                    <input type="submit" className="button success" value="Login" onClick={this.login}/>
                    <a href="/register">Registration</a>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
  return {
    authenticated: state.app.authenticated,
    token: state.app.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setToken: () => dispatch(actions.SET_TOKEN_ACTION('aKFtu5M'))
  };
}; 


export default connect(mapStateToProps,mapDispatchToProps)(Login);
