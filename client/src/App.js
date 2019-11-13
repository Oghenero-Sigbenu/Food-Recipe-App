import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//components
import './App.css';
import './style.css';
import NavbarApp from './components/common/NavbarApp/NavbarApp'
import {Home,Login, Auth, Recipes, CreateRecipe, RecipeDetail, Register} from "./components/pages/Index";
import Logout from "./components/Logout";

//actions
import { authAutoLogin, loadAuthUser } from "./store/action/auth"

export class App extends Component {

  componentDidMount = () => {
    // this.props.onAutoLogin();
    if(this.props.isAuth) {
      this.props.onLoadAuthUser();
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
        <Route path="/auth" component={Auth} />
        <Route path="/add" component={CreateRecipe} /> 
        <Route path="/recipe" component={Recipes} />
        <Route path="/detail/:id" component={RecipeDetail} />
        <Route path="/" exact component={Home} />
        <Route render={() => <h2>Not Found</h2>} />
    </Switch>
       );
       }
       const {isAuth,user} =  this.props;
       console.log(isAuth,user)
    return (
      <div className="App">
          <NavbarApp isAuth={isAuth} user={user}/>
          {routes}  
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null,
  user: state.auth.user

});

const mapDispatchToProps = dispatch => ({
  // onAutoLogin: () => dispatch(authAutoLogin()),
  onLoadAuthUser: () => dispatch(loadAuthUser())
});

export default connect(
      mapStateToProps,
      mapDispatchToProps)(App);