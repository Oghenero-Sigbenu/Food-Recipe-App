import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Footer.css";
import Alert from "../Alert";
import { addEmail } from "../../../store/action/email";
import { reg } from '../Validation';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      disable: true,
      value: "",
      show: true
    }
    this.getValues = this.getValues.bind(this);
    this.submit = this.submit.bind(this);
  };

  submit(e) {
    const { email } = this.state;
    this.props.addEmail({ email })
    this.setState({
      email: ""
    })
  }

  getValues(e, disable) {
    const { email } = this.state;
    const { value, name } = e.target;
    this.setState({
      [name]: value,
      disable: disable || (email === "" || !reg.test(email)) ? true : false
    })
  };
  render() {
    const { email } = this.state;
    const { msg, isCreated } = this.props;
    return (
      <>
        {/* <div className="footer">
          <h4>Foody Newsletters </h4>
          {isCreated ? <Alert classStyle="green" msg={msg} /> : ""}
          <div className="cs-btn">
            <input type="email" name="email" value={email} onChange={this.getValues} />
            <button className="c-btn" onClick={this.submit}>Subscribe Now</button>
          </div>
        </div> */}
        <footer>
          <ul>
            <li>
              &copy; 2019 Designed Oghenero Sigbenu.
            </li>
          </ul>
          <ul>
            <li>
              Terms of Service
            </li>
            <li>
              Privacy Policy
            </li>
          </ul>

        </footer>
      </>
    );
  }
};
const mapStateToProps = state => ({
  isLoading: state.recipe.isLoading,
  isCreated: state.email.isCreated,
  msg: state.email.msg
});

export default connect(
  mapStateToProps,
  { addEmail }
)(Footer);