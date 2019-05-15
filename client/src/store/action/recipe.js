import axios from "../../utils/axiox.base"                                                                                                                                                                                                                                      
import * as types from "./types"

export const loading = () => {
	return {
		type: types.LOADING
	    };
        };

export const getRecipeSuccess = (recipes) => {
    return {
        type: types.GET_RECIPES_SUCCESS,
        recipes
        }
        };


export const addRecipeSuccess = (recipes) => {
    return {
        type: types.ADD_RECIPE_SUCCESS,
        recipes
        }
        }
export const errorOccured = () => {
    return {
        type: types.ERROR_OCCURED
            };
            };

export const addRecipeStart = () => {
    return{
        type: types.ADD_RECIPE_INIT
    }
}
export const getRecipeStart = () => {
    return{
        type: types.GET_RECIPE_INIT
    }
}
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

export const addRecipe = recipeData => {
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
                return dispatch(addRecipeSuccess(res.data))
            })
            .then(() => {
                dispatch(addRecipeStart());
            })
            .catch(err => dispatch(errorOccured(err)))
                }
    }



