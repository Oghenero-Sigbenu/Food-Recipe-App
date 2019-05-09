import React, { Component } from "react";
import { connect } from "react-redux";
// import { Spinner } from "reactstrap";

// import banner from "../banner.png";
// import "../style.css";

// import Sidebar from "../components/Sidebar/Sidebar";
// import RecipeCard from "../components/RecipeCard/RecipeCard";
// import Footer from "../components/Footer/Footer";
 import { getRecipe } from "../../store/action/recipe";

class Home extends Component {
    componentDidMount() {
        this.props.onGetRecipes();
    }
    render() {
        return (
            <>
                <section className="banner">
                    <div className="banner-text">
                        <h2>Order food the easy way</h2>
                        <p>Choose your favourite meals now</p>
                        <button>Explore All</button>
                    </div>
                    {/* <img src={banner} className="banner-img" alt="foody banner" /> */}
                </section>
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