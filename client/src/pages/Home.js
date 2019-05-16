import React, { Component } from "react";
import { connect } from "react-redux";
// import { Spinner } from "reactstrap";


import banner from "../files/foody3.jpg";
import Sidebar from "../components/SideBar/SideBar";
// import RecipeCard from "../components/RecipeCard/RecipeCard";
import Footer from "../components/Footer/Footer";
 import { getRecipe } from "../store/action/recipe";
 import RecipeCards from "../components/RecipeCards/RecipeCards"
 import "../style.css"

class Home extends Component {
    componentDidMount() {
        this.props.onGetRecipes();
    }
    render() {
        return (
            <>
                <div className="banner">
                    <div className="banner-text">
                        <h2>Share Your Favourite Recipe With Us</h2>
                        <p>Choose your favourite meals now</p>
                        <button>Explore All</button>
                    </div>
                    <div className="banner-image">
                        <img src={banner}  alt="foody banner" />
                    </div>
                </div>
                <div class="menu"></div>
                <div className="main-section"> 
                <div className="side-bar">
                      <Sidebar/>
               </div>
                <div className="recipes">
                <RecipeCards recipes={this.props.recipes} isAuth={this.props.isAuth} user={this.props.userId}  />
                </div> 
                </div>
                <div>
                <Footer/>
                </div>
                {/* <section className="phase1">
                    <Sidebar />
                    <div className="recipe">
                        <div className="recipes">
                            {this.props.isLoading ? (
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Spinner color="dark" />
                                </div>
                            ) : (

                                    <RecipeCard recipes={this.props.recipes} isAuth={this.props.isAuth} userId={this.props.userId}/>

                                )}
                        </div>
                        {this.props.isLoading ? (
                            <h2>Loading, please wait</h2>
                        ):(
                            <button className="show-more">Show more</button>
                        )}
                        </div>
                </section> */}
                {/* <Footer/> */}
            </>
        )
    }
}

const mapStateToProps = state => ({
    recipes: state.recipe.recipes,
    isLoading: state.recipe.isLoading,
    isAuth: state.auth.token !== null,
    userId:state.auth.userId

});

const mapDispatchToProps = dispatch => ({
    onGetRecipes: () => dispatch(getRecipe())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);