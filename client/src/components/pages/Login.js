import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import InputValidator from '../common/InputValidator';
import { reg } from '../common/Validation';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';
import { AnimateInOut } from '../common/AnimateInOut';

import { login } from '../../store/action/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      disable: true,
      show: true
    }
    this.getValue = this.getValue.bind(this);
    this.submit = this.submit.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
  }

  navigate(path) {
    this.setState({
      show: false
    });
    setTimeout(() => {
      this.props.history.push(path);
    }, 500);
  };

  submit() {
    const { email, password } = this.state;
    this.props.login({email, password})
    this.setState({
      show: false
    })
    setTimeout(() => {
      this.props.history.push("/");
    }, 500);
  }

  getValue(title, value, disable) {
    const { email, password } = this.state;
    this.setState({
      [title]: value,
      disable: disable || (email === "" || !reg.test(email) || password === "") ? true : false
    })
  }

  render() {
    const { email, password, disable, show } = this.state;
    const { isLoading, msg } = this.props;
    const alertMsg = msg ? <Alert classStyle="red" msg={msg} /> : "";
    return (
      <AnimateInOut classname={show ? 'slide-in-top one' : 'slide-out-left'}>
        {/* <Header /> */}
        <div className="container">
          <div style={{ width: '100%'}}>
            
            {isLoading ? <Spinner/> :
              <>
                <h2>Sign In</h2>
                <div className="alert-style">{alertMsg}</div>
                <InputValidator valType="email" placeHolder="JohnDoe@example.com" label="Email" type="email" value={email} name="email" getValue={this.getValue} />
                <InputValidator valType="password" placeHolder="Enter Password" label="Password" type="password" value={password} name="password" icon="true" getValue={this.getValue} />
                <Button onclick={this.submit} styles={disable ? "btn-disable" : "btn-enable"} disable={disable}>Login</Button>
                <div className="form-other">
                  <NavLink to="#" onClick={() => this.navigate('/reset-password')}>Forgot password?</NavLink>
                  <NavLink to="/register" onClick={() => this.navigate('/register')}>No account ? Sign Up!</NavLink>
                </div>
              </>
          }
          </div>
        </div>
      </AnimateInOut>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, token, isLoading, msg, isLoggedIn } = state.auth;
  return {
    user,
    token,
    isLoading,
    msg,
    isLoggedIn,
  }
}

export default connect(mapStateToProps,{login} )(Login);
