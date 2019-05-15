import React, {Component} from "react";
import { connect } from "react-redux";
import { Col, Row, Spinner} from "reactstrap";

import RecipeCards from "../../components/RecipeCards/RecipeCards";
import { getRecipe } from "../../store/action/recipe";

import "./Recipes.css"
class Recipes extends Component {
	componentDidMount() {
        this.props.onGetRecipe();
        console.log(this.props.onGetRecipe())
	}
            render() { 
                const divStyle = {display: "flex",height:"600px", width: "100%",
                         background_color: "danger"}
		                    return (
                                <div className="recipes">
                                     <h2>Recipes List</h2>
                                    {/* {this.props.isLoading ? (
                                        <Spinner /> ) : (  */}
                                        <RecipeCards recipes={this.props.recipes} isAuth={this.props.isAuth} user={this.props.user}  />
                                        {/* )} */}
                                     
                                    </div>

                                     );

                                }
                            }

const mapStateToProps = state => ({
    recipes: state.recipe.recipes,
    isLoading: state.recipe.isLoading,
    isAuth: state.auth.token !== null,
    user : state.auth.user
});

const mapDispatchToProps = dispatch => ({
    onGetRecipe: () => dispatch(getRecipe())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Recipes);