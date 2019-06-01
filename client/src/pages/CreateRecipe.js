import React, {Component} from "react";
import {addRecipe, addRecipeStart} from "../store/action/recipe";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import {
    Col,
    Row,
    Container,
    Form,
    FormGroup,
    Input,
    Label
  } from "reactstrap";

class CreateRecipe extends Component {
    state ={
        title: "",
        description: "",
        ingredients: "",
        steps: "",
        imageurl: ""
    }

    //onchange function
    handleInputChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    onImgChanged = e => {
        this.setState({
            [e.target.name] : e.target.files[0]
        })
    };

   
    onSubmit = (e) => {
        e.preventDefault();
        const formData = {
                        title: this.state.title, 
                        description: this.state.description,
                        ingredients: this.state.ingredients,
                        steps: this.state.steps,
                        imageurl: this.state.imageurl
                        }
                        console.log(this.props.recipeCreated)
    		this.props.onAddRecipe(formData) ;
};

render(){
const inputStyle = {width: "100%", height: "90px", border_radius: "25px"}
const selectStyle = {width: "100%"}
    return(
        <div >
        <Container>
            <Row>
            <Col md={{ size: 6, offset: 3 }}> 
            {this.props.recipeCreated  && <Redirect to="/" />}
                <Form  onSubmit={this.onSubmit} method="POST" encType="multipart/form-data">
                    <FormGroup>
                        <Label for="title"><h3>Title:</h3></Label>
                        <Input type="text" name="title" placeholder="Recipe Name"
                         onChange={this.handleInputChange} style={inputStyle} />   
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="textarea"
                            rows="7"
                            name="description"
                            id="steps"
                            placeholder="Short description about the dish"
                            onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="select"><h3>Category:</h3> </Label>
                        <Input type="select" name="select" style={selectStyle}>
                            <option>African Dishes</option>
                            <option>Breakfast Recipes</option>
                            <option>Continental Dishes</option> 
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        {/* <Label for="recipe description">Description</Label> */}
                        <Input
                            type="textarea"
                            rows="7"
                            name="steps"
                            id="steps"
                            placeholder="Steps in making it"
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        {/* <Label for="ingredients">ingredients</Label> */}
                        <Input
                            type="textarea"
                            rows="7"
                            name="ingredients"
                            id="ingredients"
                            placeholder="Recipe Ingredients"
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label for="imageurl"><h3>Image Upload</h3></label>
                        <input type="file"
                                 name="imageurl"
                                 id = "imageurl"
                                 style={inputStyle} 
                                 accept=".jpg, .jpeg, .png"
                                onChange={this.onImgChanged} />
                 </FormGroup>
                    <FormGroup>
                        <button type="submit" color="danger">Add Recipe</button>    
                    </FormGroup>
                    </Form>
                
             </Col>
            </Row>
        </Container>
    </div>
        )
    }
}


const mapStateToProps = state => ({
	isLoading: state.recipe.isLoading,
	recipeCreated: state.recipe.recipeCreated,
	error: state.recipe.error
});

const mapDispatchToProps = dispatch => ({
	onAddRecipeStart: () => dispatch(addRecipeStart()),
	onAddRecipe: formData => dispatch(addRecipe(formData))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateRecipe);