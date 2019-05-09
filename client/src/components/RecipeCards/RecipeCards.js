
import React from "react";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {
	Col,
	Row,
} from "reactstrap";

import "./RecipeCards.css"
const RecipeCards = ({recipes}) => {
	console.log({recipes})
	
	// const divStyle = {display: "flex", width: "100%", background_color: "danger"}
	return (
		
        	
					 <> 
					 
					
				        {recipes.map(recipe => (
							<h2>{recipe.title}</h2>
						))}
					
					</>
			
				
			)};
	

						
export default RecipeCards;
