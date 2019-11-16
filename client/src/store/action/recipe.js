import axios from "../../utils/axiox.base"                                                                                                                                                                                                                                      
import * as types from "./types"

export const loading = () => {
	return {
		type: types.LOADING
        }};

export const getRecipeSuccess = (recipes) => {
    return {
        type: types.GET_RECIPES_SUCCESS,
        recipes
        }};


export const addRecipeSuccess = (recipes) => {
    return {
        type: types.ADD_RECIPE_SUCCESS,
        recipes
        }}

export const getUserRecipeSuccess = (recipe) => {
    return {
        type: types.GET_USER_RECIPES_SUCCESS,
        recipe
        }}

export const errorOccured = () => {
    return {
        type: types.ERROR_OCCURED
            }};

export const addRecipeStart = () => {
    return{
        type: types.ADD_RECIPE_INIT
    }}


export const getRecipeStart = () => {
    return{
        type: types.GET_RECIPE_INIT
    }}

//get all recipes
export const getRecipe = () => {
    return dispatch => {
        dispatch(loading())
            axios.get("/recipe/all")
                .then(res => {
                    dispatch(getRecipeSuccess(res.data))
                    console.log(res.data)
                    })
                    .then(() => {
                        dispatch(getRecipeStart());
                    })
                    .catch(err => dispatch(errorOccured(err)))
                    }
                    }
 

//get single recipe
export const getSingleRecipe = recipeId => {
    console.log("new")    
    return dispatch => {
        dispatch(loading());
            axios.get(`/recipe/${recipeId}`)
            .then(res => {
                console.log(res.data)
                dispatch({ type: types.GET_SINGLE_RECIPES_SUCCESS, recipe: res.data})
            })
            .catch(err => dispatch(errorOccured(err)));
            }
            }

//creating a recipe
export const addRecipe = recipeData => {
    console.log(recipeData)
    return (dispatch, getState) => {
        dispatch(loading());
        const token = getState().auth.token;

        let formData;
        const config = { headers: {}};
    
    if(token){
        config.headers["x-access-token"] = token;
        config.headers["Content-Type"] = "multipart/form-data";
        formData = new FormData();
        formData.append("title", recipeData.title);
        formData.append("description", recipeData.description);
        formData.append("steps", recipeData.steps);
        formData.append("ingredients", recipeData.ingredients);
        formData.append("imageurl", recipeData.imageurl);
    }      
        axios.post("recipe/post", formData, config)
            .then(res => {
                dispatch(addRecipeSuccess(res.data))
                console.log(res.data)
            })
            .catch(err => dispatch(errorOccured(err)))
            }
    }

//deleting a recipe
export const deleteRecipe = (recipeId) => {
    return (dispatch, getState) => {
        dispatch(loading());
        const token = getState().auth.token;
		const config = {
			headers: {}
        };
        
        if(token) {
            config.headers["x-access-token"] = token;
        }
        axios.delete(`/delete/${recipeId}`, config)
            .then(res => {
                return dispatch({type: types.DELETE_RECIPE_SUCCESS})
            })
            .then(recipe => {
                dispatch({type: types.DELETE_RECIPE_INIT})
            })
            .catch(err => dispatch(errorOccured(err)))
    }
}


//get a user recipes
export const getUserRecipes = () => {
    return (dispatch, getState) => {
        dispatch(loading());
        const token = getState().auth.token;

        //Headers 
        const config = {
			headers: {}
		};

		if (token) {
			config.headers["x-access-token"] = token;
        }
        axios.get("recipe/user/recipes", config)
        .then(res => {
            dispatch(getUserRecipeSuccess(res.data))
        })
        .catch(err => dispatch(errorOccured(err)));

    }
}

//edit recipe start
export const editRecipeInit = recipeId => {
    return (dispatch, getState) => {
        //    dispatch(loading());
        const token = getState().auth.token;
        const userId = getState().auth.userId;
   

    //header
    const config ={
        headers:{}
    };
    //if token is valid
    if(token) {
        config.headers["x-access-token"] = token;
    }
    axios.get(`recipe/edit/${recipeId}`, config)                                                                                                              
    .then(res => {
        // eslint-disable-next-line
        if(res.data.userId !== userId) {
            
        }else{
            dispatch({ type: types.EDIT_RECIPE_INIT, recipe:res.data  })
        }
    })
    .catch(err => dispatch(errorOccured(err)));

}}

export const editRecipeDone= () => {
	return {
		type: types.EDIT_RECIPE_DONE
	};
}

export const editRecipe = (recipeData) => {
    return (dispatch, getState) => {
        dispatch(loading());
        const token =  getState().auth.token;
        const recipeId = getState().recipe.id;  
        let formData = null;

    const config ={
        headers:{}
    }

    if(token){
        config.headers["x-access-token"] = token;
        config.headers["Content-Type"] = "multipart/form-data";
        formData = new FormData();
        formData.append("title", recipeData.title);
        formData.append("description", recipeData.description);
        formData.append("steps", recipeData.steps);
        formData.append("ingredients", recipeData.ingredients);
        formData.append("imageurl", recipeData.imageurl);
    }
    axios.put(`recipe/edit/${recipeId}`, formData, config)
    .then(res => {
        return dispatch({type: types.EDIT_RECIPE_SUCCESS});
    })
    .then(() => {
        dispatch(editRecipeDone());
    })
    .catch(err => dispatch(errorOccured(err.response.data)));

    }
}
