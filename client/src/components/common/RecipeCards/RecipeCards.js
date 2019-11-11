
import React from "react";
import { NavLink } from "react-router-dom";
// import {
// 	Col,
// 	Row,
// } from "reactstrap";
import striptags from 'striptags';


import "./RecipeCards.css"
const RecipeCards = ({recipes, isAuth, user,click}) => {
	
	// const divStyle = {display: "flex", width: "100%", background_color: "danger"}
return (
		<div className="all-recipes"> 
			{recipes.map(recipe => (
		
			<div className="recipe-cards" key={recipe.id}>
			<img src={`http://localhost:5000/${recipe.imageurl}`}  alt="food" className="card-image"></img>
			<div className="details">
			<h4>{recipe.title}</h4>
			 <div className="recipe-description">
			{/* <p>{recipe.description}</p> */}
			 {striptags(recipe.description).slice(0, 25) + "..."} 
			 	<NavLink to={`detail/` + recipe.id}>Read More</NavLink></div>
			 {/* <h6>By: {user.firstname}</h6> */}
			</div>
			{isAuth ?
				<>
					<div className="recipe-actions">
						{/* <i class="far fa-bookmark"></i>  */}
						{/* <button><i className="fas fa-bookmark"></i></button> */}
						<button onClick={click}><i className="far fa-heart">12</i></button>
						<i className="far fa-comment-alt">123</i>
					</div>
				</>
				: ""
			}
			</div>
			))}
	
		</div>
			
				
			)};
	

						
export default RecipeCards;
