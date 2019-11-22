import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';
// import Moment from "react-moment";
// import ReacthtmlParser from "react-html-parser";
import { Spinner, Container } from "reactstrap";

import { getSingleRecipe } from "../../store/action/recipe";
import { addComment } from "../../store/action/comment";
import Footer from "../common/Footer/Footer";
import "../../style.css"

class RecipeDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: "",
			disable: true,
			value: "",
			show: true
		}
		this.getValues = this.getValues.bind(this);
		this.submit = this.submit.bind(this);
		// this.navigate = this.navigate.bind(this);
	};

	componentDidMount = () => {
		const recipeId = this.props.match.params.id;
		this.props.getSingleRecipe(recipeId);
	}
	submit(e) {
		const { comment } = this.state;
		const { userId } = this.props;
		const id = +this.props.match.params.id;
		this.props.addComment({ comments: comment, RecipeId: id, UserId: userId })
		this.setState({
			comment: ""
		})
	}

	getValues(e, disable) {
		const { comment } = this.state;
		const { value, name } = e.target;
		this.setState({
			[name]: value,
			disable: disable || (comment === "") ? true : false
		})
	};
	render() {
		const { recipe } = this.props;
		const { comment } = this.state;
		return (
			<>
			<Container>
				{!recipe ? (<h2>Recipes</h2>) : (
					<>
						<h1>{recipe && recipe.title}</h1>
						{this.props.isloading ? (
							<div style={{ display: "flex", justifyContent: "center" }}>
								<Spinner color="dark" />
							</div>
						) : (
								<>
									<div className="detail">
										<div className="recipe-image">
											<img src={`http://localhost:5000/${recipe && recipe.imageurl}`} alt="recipe" />
											{/* <p>By: {recipe && recipe.User.firstname} </p> */}
										</div>
										<div className="text">
											<div className="up">
												<div className="description">
													<h4>Description</h4>
													{/* <p>{recipe && recipe.steps}</p> */}
													<p>{recipe && recipe.description}</p>
												</div>
												<div className="ingredients">
													<h4>Ingredients</h4>
													<p>{recipe && recipe.ingredients}</p>
												</div>
											</div>
											<div className="steps">
												<h4>Method</h4>
												<p>{recipe && recipe.steps}</p>
											</div>
											{/* {recipe && ReactHtmlParser(recipe.description)} */}
											{/* <h5>Created <Moment fromNow>{recipe && recipe.updatedAt}</Moment></h5> */}
											{/* {isAuth ?
												<div className="actions">
													<i className="fas fa-bookmark"></i>
													<i className="far fa-heart">12</i>
													<i className="far fa-comment-alt">123</i>
												</div>
												:
												""
											} */}
										</div>

									</div>
									<div className="act">
										<h3>Comments</h3>
										<div className="activity">
											<div className="activity-logs">
												{recipe && recipe.comments.map(comment => (
													<div className="activity-card" key={comment.id}>
														<p>{comment.comments}</p>
													</div>
												))}
											</div>
										</div>
										<div className="comment-footer">
											<input type="text" name="comment" placeholder="type your comments....." value={comment} onChange={this.getValues}></input>
											<button className="send" type="submit" onClick={this.submit}>
												<span><FontAwesomeIcon icon={faPaperPlane} /></span>
												<span>Add</span>
											</button>
										</div>
									</div>
								</>
							)}
					</>
				)}
			</Container>
				<Footer/>
				</>
		)
	}
}

const mapStateToProps = state => ({
	recipe: state.recipe.recipe,
	isLoading: state.recipe.isLoading,
	isAuth: state.auth.token !== null,
	userId: state.auth.userId

});

export default connect(mapStateToProps, { addComment, getSingleRecipe })(RecipeDetail);