import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//components
import './App.css';
import './style.css';
import NavbarApp from './components/common/NavbarApp/NavbarApp'
import {Home,Login,  Recipes, CreateRecipe, RecipeDetail, Register} from "./components/pages/Index";
import Logout from "./components/Logout";
// import Footer from "../src/components/common/Footer/Footer";

//actions
import { auth, loadAuthUser,authAutoLogin } from "./store/action/auth"

export class App extends Component {

  componentDidMount = () => {
    this.props.auth();
    if(this.props.isAuth) {
      this.props.loadAuthUser();
    }
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/recipe" component={Recipes} />
        <Route path="/detail/:id" component={RecipeDetail} />
        <Route path="/" exact component={Home} />
        <Route render={() => <h2>Not Found</h2>} />
      </Switch>
    );
    if (this.props.isAuth){
      routes =(
    <Switch>
      <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
        <Route path="/add" component={CreateRecipe} /> 
        <Route path="/recipe" component={Recipes} />
        <Route path="/detail/:id" component={RecipeDetail} />
        <Route path="/" exact component={Home} />
        <Route render={() => <h2>Not Found</h2>} />
    </Switch>
       );
       }
       const {isAuth,user,token} =  this.props;
    return (
      <div className="App">
          <NavbarApp isAuth={isAuth} token={token} user={user}/>
          {routes}  
          {/* <Footer/> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null,
  // isAuth: state.auth.isLoggedIn,
  token: state.auth.token ,
  user: state.auth.user

});

const mapDispatchToProps = dispatch => ({
  onAutoLogin: () => dispatch(authAutoLogin()),
  onLoadAuthUser: () => dispatch(loadAuthUser())
});

export default connect(
      mapStateToProps,
     {auth} )(App);