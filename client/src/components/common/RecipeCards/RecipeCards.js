
import React from "react";
import { NavLink } from "react-router-dom";
// import {
// 	Col,
// 	Row,
// } from "reactstrap";
import striptags from 'striptags';


import "./RecipeCards.css"
const RecipeCards = ({ recipes, isAuth, user, click }) => {

	// const divStyle = {display: "flex", width: "100%", background_color: "danger"}
	return (
		<div className="all-recipes">
			{/* {recipes && recipes.map(recipe => (
				<div className="recipe-cards" key={recipe.id}>
					<img src={`http://localhost:5000/${recipe.imageurl}`} alt="food" className="card-image"></img>
					<div className="details">
						<h4>{recipe.title}</h4>
						<div className="recipe-description">
							{striptags(recipe.description).slice(0, 25) + "..."}
							<NavLink to={`detail/` + recipe.id}>Read More</NavLink></div>
					</div> */}
						{/* <h6>By: {recipe.User.firstname}</h6> */}
					{/* {isAuth ? */}
						{/* <>
							<div className="recipe-actions">
								<hr></hr> */}
								{/* <i class="far fa-bookmark"></i>  */}
								{/* <button><i className="fas fa-bookmark"></i></button> */}
								{/* <button onClick={click}><i className="far fa-heart">12</i></button> */}
								{/* <NavLink to={`detail/` + recipe.id}>{recipe.comments.length} <i className="far fa-comment-alt"></i></NavLink>
							</div>
						</>
						: ""
					} */}
				{/* </div>
			))} */}

		</div>


	)
};



export default RecipeCards;
