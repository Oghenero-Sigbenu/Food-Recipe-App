import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
  Container,
  Row,
  Col,
  Card,
  CardBody,
//   CardTitle,
  CardHeader,
  CardFooter,
  Alert
} from "reactstrap";

 import { auth, toggleAuth } from "../store/action/auth";

 class Auth extends Component {
  state = {
    firstname: "",
    lastname: "",
    username:"",
    email: "",
    password: "",
    password2: "",
    imageurl: "",
    passwordMatched: false
  };

   onChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onImgChanged = e => {
		this.setState({
			image: e.target.files[0]
		});
  };
  
   submitForm = e => {
     console.log("nake")
    e.preventDefault();
    let formData;
    if (this.props.isLogin) {
      formData = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.onAuth(formData);
    } else {
      formData = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        imageurl: this.state.imageurl
      };
      this.props.onAuth(formData);
      console.log(formData)
    }
  };

   render() {
    const { isLogin, isAuth, error } = this.props;
    return (
      <Container>
        {isAuth && <Redirect to="/" />}
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card style={{marginTop:"10px"}}>
              <CardHeader tag="h2">
              {!isLogin ? "Create an Account": "Login"}
              </CardHeader>
              <CardBody>
                {error && <Alert color="danger">"yes"{this.props.error.msg}</Alert>}
                <Form onSubmit={this.submitForm} action="POST" encType={
										!isLogin
											? "multipart/form-data"
											: "application/x-www-form-urlencoded"
									}>
                  {!isLogin && (
                  <>  
                  <FormGroup>
                      {/* <Label for="firstname">First Name</Label> */}
                      <Input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter First Name"
                        onChange={this.onChanged}
                      />
                    </FormGroup>
                    <FormGroup>
                    {/* <Label for="lastname">Last Name</Label> */}
                    <Input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Enter Last Name"
                      onChange={this.onChanged}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="profilePic">Profile Picture</Label>
                    <Input
                        type="file"
                        name="imageUrl"
                        id="profilePic"
                        accept=".jpg, .jpeg, .png"
                        onChange={this.onImgChanged}
                    />
                    <FormText color="muted">
                        Do you wish for your profile to be easily noticed? Images must be png, jpg or jpeg format.
                    </FormText>
                </FormGroup>
                  <FormGroup>
                    {/* <Label for="username">Username</Label> */}
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter Username"
                      onChange={this.onChanged}
                    />
                  </FormGroup>
                  </>
                  )}
                  <FormGroup>
                    {/* <Label for="email">Email</Label> */}
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your Email Address"
                      onChange={this.onChanged}
                    />
                  </FormGroup>
                  <FormGroup>
                    {/* <Label for="password">Password</Label> */}
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your Password"
                      onChange={this.onChanged}
                    />
                  </FormGroup>
                  {!isLogin && (
                    <FormGroup>
                      <Label for="password2">Confirm Password</Label>
                      <Input
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder="Confirm Password"
                        onChange={this.onChanged}
                        invalid={this.state.password !== this.state.password2}
                      />
                      <FormFeedback>Password doesnt match</FormFeedback>
                    </FormGroup>
                  )}
                  <Button color="primary" >Login</Button>
                </Form>
              </CardBody>
              <CardFooter>
                <span
                  onClick={this.props.onToggleAuth}
                  style={{ cursor: "pointer" }}
                >
                  {isLogin
                    ? "Create an Account"
                    : "Already have an Account? Login Here!"}
                </span>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

 const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isLoading: state.auth.isLoading,
  isAuth: state.auth.token !== null,
  error: state.auth.error
});

 const mapDispatchToProps = dispatch => ({
  onAuth: formData => dispatch(auth(formData)),
  onToggleAuth: () => dispatch(toggleAuth())
});

 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);