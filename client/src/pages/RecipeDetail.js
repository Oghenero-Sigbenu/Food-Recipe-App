import React, {Component} from "react";
import {connect} from "react-redux";
// import Moment from "react-moment";
// import ReacthtmlParser from "react-html-parser";
import { Spinner, Container } from "reactstrap";

import {getSingleRecipe} from "../store/action/recipe";
import  "../style.css"

class RecipeDetail extends Component{
    componentDidMount = () => {
        const recipeId = this.props.match.params.id;
        this.props.onGetSingleRecipe(recipeId);
    }
    render() {
        const {recipe, isAuth} = this.props;
        return(
            <Container>
                {!recipe ? (<h2>Recipes</h2>) :(
            <>
                <h1>{ recipe && recipe.title}</h1>
                    {this.props.isloading ? (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Spinner color="dark" />
                        </div>
                    ) : (
                    <>
     	<div className="detail">
             <div className="recipe-image">
                <img src={`http://localhost:5000/${recipe && recipe.imageurl}`} alt="recipe" />
            </div>       
            {/* <h4>by {recipe && recipe.user.firstname} {recipe && recipe.user.lastname}</h4> */}
        <div className="text">
            <div className="up">
            <div className="description">
                <h2>How is it done?</h2>
                {/* <p>{recipe && recipe.steps}</p> */}
                <p>{recipe && recipe.decription}</p>
            </div>
            <div className="ingredients">
            <h2>Ingredients Needed</h2>
            <p>{recipe && recipe.ingredients}</p>
            </div>
            </div>
           <div className="steps">
                <h2>How to prepare the dish.</h2>
                <p>{recipe && recipe.steps}</p>
           </div>
           
            {/* {recipe && ReactHtmlParser(recipe.description)} */}
            {/* <h5>Created <Moment fromNow>{recipe && recipe.updatedAt}</Moment></h5> */}


            {isAuth ?

                <div className="actions">
                    <i className="fas fa-bookmark"></i>
                    <i className="far fa-heart">12</i>
                    <i className="far fa-comment-alt">123</i>
                </div>
                :
                ""
            }
            </div>

        </div>                   
            </>
            )}
    </>
                )}
    </Container>
        )
    }
}

const mapStateToProps  = state => ({
    recipe: state.recipe.recipe,
    isLoading: state.recipe.isLoading,
    isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    onGetSingleRecipe: recipeId => dispatch(getSingleRecipe(recipeId))
})
export default connect (mapStateToProps, mapDispatchToProps)(RecipeDetail);