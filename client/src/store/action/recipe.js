import axios from "../../utils/axiox.base"                                                                                                                                                                                                                                      
import * as types from "./types"

export const loading = () => {
	return {
		type: types.LOADING
	    };
        };

export const getRecipeSuccess = () => {
    return {
        type: types.GET_RECIPES_SUCCESS
        }
        };


export const addRecipeSuccess = () => {
    return {
        tpes: types.ADD_RECIPE_SUCCESS
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

        let formData;
        const config = { headers: {}};

        config.headers["Content-Type"] = "multipart/form-data";
        formData = new FormData();
        formData.append("title", recipeData.title);
        formData.append("description", recipeData.description);
        formData.append("steps", recipeData.steps);
        formData.append("ingredients", recipeData.ingredients);
        formData.append("imageurl", recipeData.imageurl);
               
        axios
        .post("recipe/post", formData, config)
            .then(res =>{
                return dispatch(addRecipeSuccess(res.data))
                    })
                    .then(() => {
                        dispatch(addRecipeStart());
                    })
                    .catch(err => dispatch(errorOccured(err)))
                        }
                }



