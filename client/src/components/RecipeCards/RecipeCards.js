
import React from "react";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {
	Col,
	Row,
} from "reactstrap";

import "./RecipeCards.css"
const RecipeCards = ({recipes, isAuth, user}) => {
	console.log({recipes, isAuth, user})
	
	// const divStyle = {display: "flex", width: "100%", background_color: "danger"}
return (
		<div className="all-recipes"> 
			{recipes.map(recipe => (
			<div className="recipe-cards" key={recipe.id}>
			<img src={`http://localhost:5000/api/v1${recipe.imageurl}`}  alt="recipe image" className="card-image"></img>
			<div className="details">
			<h2>{recipe.title}</h2>
			<h5>{recipe.description}</h5>
			 {/* <h6>By: {recipe.user.firstname}</h6> */}
			</div>
			</div>
			))}
	
		</div>
			
				
			)};
	

						
export default RecipeCards;
