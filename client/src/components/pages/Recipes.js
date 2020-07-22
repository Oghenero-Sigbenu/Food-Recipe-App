import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import Footer from "../common/Footer/Footer";
import RecipeCards from "../common/RecipeCards/RecipeCards";
import { getRecipe } from "../../store/action/recipe";
import "../../style.css";
class Recipes extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		this.like = this.like.bind(this);
	};
	componentDidMount() {
		this.props.onGetRecipe();
	}

	like() {
		console.log("laaaa")
	}
	render() {
		// const divStyle = {display: "flex",height:"600px", width: "100%",
		//          background_color: "danger"}
		return (
			<div className="recipe-list">
				<div className="recipes-list">
					<h2>Recipes List</h2>
					{!this.props.isLoading ? (
						<Spinner />) : (
							<RecipeCards recipes={this.props.recipes} click={this.like} isAuth={this.props.isAuth} user={this.props.userId} />
						)}
				</div>
				<div className="foot">
				<Footer />
				</div>
			</div>

		);

	}
}

const mapStateToProps = state => ({
	recipes: state.recipe.recipes,
	isLoading: state.recipe.isLoading,
	isAuth: state.auth.token !== null,
	userId: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	onGetRecipe: () => dispatch(getRecipe())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Recipes);