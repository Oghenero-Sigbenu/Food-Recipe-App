import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
// import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import NavbarApp from './components/NavbarApp/NavbarApp'
import {Home, Auth, Recipes, CreateRecipe, RecipeDetail} from "./pages/Index"
import { connect } from "react-redux";
import { authAutoLogin, loadAuthUser } from "./store/action/auth"
import Logout from "./components/Logout"



export class App extends Component {

  componentDidMount = () => {
    this.props.onAutoLogin();
    if(this.props.isAuth) {
      this.props.onLoadAuthUser();
    }
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/recipe" component={Recipes} />
        {/* <Route path="/detail/:id" component={RecipeDetail} /> */}
        <Route path="/" exact component={Home} />
        <Route render={() => <h2>Not Found</h2>} />
      </Switch>
    );
    if (this.props.isAuth){
      routes =(
    <Switch>
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
    return (
      <div className="App">
          <NavbarApp isAuth={this.props.isAuth} user={this.props.user}/>
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
  onAutoLogin: () => dispatch(authAutoLogin()),
  onLoadAuthUser: () => dispatch(loadAuthUser())
});

export default connect(
      mapStateToProps,
      mapDispatchToProps)(App);