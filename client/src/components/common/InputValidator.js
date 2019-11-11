import React, { Component } from 'react';
import './css/Input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { reg, isValid, isUsername } from "./Validation";

class InputValidator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      hidden: true,
    }
    this.inputChange = this.inputChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  inputChange(e) {
    const { value, name } = e.target;
    const errors = this.state.errors;
    const { valType } = this.props;

    switch (valType) {
      case "name":
        errors.name = value.length < 2 ? "Full name is required" : "";
        break;
      case "username":
        errors.username = isUsername.test(value) ? "" : "Only alphabets & numbers are allowed.";
        break;
      case "email":
        errors.email = reg.test(value) ? "" : "Invalid email address";
        break;
      case "phone":
        errors.phone = isValid(value) ? "" : "Invalid phone number";
        break;
      case "password":
        errors.password = value.length < 6 ? "Password must be 6 characters long" : "";
        break;
      case "text":
        errors.text = value.length < 1 ? "Field cannot be empty" : '';
        break;
      default:
    }

    let valid;
    Object.values(errors).forEach(val => {
      valid = val.length > 0 ? true : false
    })

    this.setState({
      errors
    })
    this.props.getValue(name, value, valid);
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  render() {
    const { placeHolder, label, type, valType, value, name, icon } = this.props;
    const { errors, hidden } = this.state;
    return (
      <>
        <div className="form-element">
          <label>{label}</label><br />
          <input valtype={valType} placeholder={placeHolder} type={hidden ? type : 'text'} onChange={this.inputChange} defaultValue={value} name={name} />
          {icon ?
            hidden ?
              <FontAwesomeIcon icon={faEye} onClick={this.toggleShow} className='show-password' />
              :
              <FontAwesomeIcon icon={faEyeSlash} onClick={this.toggleShow} className='show-password' />
            :
            ''}

        </div>
        <div className="error">{errors[valType]}</div>
      </>
    );
  }
}

export default InputValidator;
