import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../store/action/auth';

import InputValidator from '../common/InputValidator';
import { reg, isUsername } from '../common/Validation';
import Button from '../common/Button';
import Alert from '../common/Alert';
import { AnimateInOut } from '../common/AnimateInOut';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      disable: true,
      show: true
    }
    this.getValue = this.getValue.bind(this);
    this.submit = this.submit.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  navigate(path) {
    this.setState({
      show: false
    })
    setTimeout(() => {
      this.props.history.push(path);
    }, 500);
  }

  submit() {
    const { name, email,  username, password } = this.state;
    this.props.auth({ firstname:name , email, username, password })
    this.setState({
      show: false
    })
    setTimeout(() => {
      this.props.history.push("/");
    }, 500);
  }

  getValue(title, value, disable) {
    const { name, email, username, password } = this.state;
    this.setState({
      [title]: value,
      disable: disable || (name === "" || email === "" || !reg.test(email) || username === "" || !isUsername.test(username) || password === "") ? true : false
    })
  }

  render() {
    const { name, email, username, password, disable, show } = this.state;
    const {  msg } = this.props;
    const alertMsg = msg ? <Alert classStyle="red" msg={msg} /> : "";
    return (
      <AnimateInOut classname={show ? 'slide-in-top one' : 'slide-out-left'}>
      {/* {token ? <Redirect to="/"/>  :"no" } */}
        {/* <Header /> */}
        <div className="container">
          <div style={{ width: '100%', position: 'relative', top: '50px' }}>
              <>
                <h2>Register</h2>
                <div className="alert-style">{alertMsg}</div>
                <InputValidator valType="name" placeHolder="John Doe" label="Name" type="text" value={name} name="name" getValue={this.getValue} />
                <InputValidator valType="email" placeHolder="JohnDoe@example.com" label="Email" type="email" value={email} name="email" getValue={this.getValue} />
                <InputValidator valType="username" placeHolder="JohnD" label="Username" type="text" value={username} name="username" getValue={this.getValue} />
                <InputValidator valType="password" placeHolder="Enter Password" label="Password" type="password" value={password} name="password" icon="true" getValue={this.getValue} />
                <Button onclick={this.submit} styles={disable ? "btn-disable" : "btn-enable"} disable={disable}>Register</Button>
                <div className="form-other">
                  <NavLink to="/login" onClick={() => this.navigate('/login')}>Have an account ? Sign In!</NavLink>
                </div>
              </>
           
          </div>
        </div>
      </AnimateInOut>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggedIn, isLoading,token,msg } = state.auth;
  return {
    isLoggedIn,
    isLoading,
    token,
    msg
  }
}
export default connect(mapStateToProps, { auth, })(Register);
