import React, {Component} from "react";
import { connect } from "react-redux";
import { Spinner} from "reactstrap";

import RecipeCards from "../components/RecipeCards/RecipeCards";
import { getRecipe } from "../store/action/recipe";

import "../style.css"
class Recipes extends Component {
	componentDidMount() {
        this.props.onGetRecipe();
        console.log(this.props.onGetRecipe())
	}
            render() { 
                // const divStyle = {display: "flex",height:"600px", width: "100%",
                //          background_color: "danger"}
		                    return (
                                <div className="recipes-list">
                                     <h2>Recipes List</h2>
                                    {!this.props.isLoading ? (
                                        <Spinner /> ) : ( 
                                        <RecipeCards recipes={this.props.recipes} isAuth={this.props.isAuth} user={this.props.userId}  />
                                         )} 
                                     
                                    </div>

                                     );

                                }
                            }

const mapStateToProps = state => ({
    recipes: state.recipe.recipes,
    isLoading: state.recipe.isLoading,
    isAuth: state.auth.token !== null,
    userId : state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onGetRecipe: () => dispatch(getRecipe())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Recipes);