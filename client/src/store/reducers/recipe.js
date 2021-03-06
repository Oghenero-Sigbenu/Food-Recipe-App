import * as types from "../action/types";

const initialState = {
    recipes: [],
    recipe: null,
    isloading: false,
    error: null,
    recipeCreated: false,
    recipeDeleted: false
}

const reducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case types.GET_RECIPES_SUCCESS:
            return {
                ...state,
                recipes: action.recipes,
                isloading: false
            }
        case types.GET_SINGLE_RECIPES_SUCCESS:
            return {
                ...state,
                recipe: action.recipe,
                isLoading: false
            }
        case types.ADD_RECIPE_SUCCESS:
            return {
                ...state,
                recipeCreated: true,
                // recipe: action.recipe,
                isloading: false,
                error: null
            }
        case types.ADD_RECIPE_INIT:
            return {
                ...state,
                recipeCreated: false,
                error: null
            };
        case types.DELETE_RECIPE_INIT:
            return {
                ...state,
                recipeDeleted: false,
                error: null
            };
        case types.DELETE_RECIPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                recipeDeleted: true,
                error: null
            };
        case types.EDIT_RECIPE_INIT:
            return {
                ...state,
                recipeUpdated: false,
                recipe: action.recipe,
                error: null
            }
        case types.EDIT_RECIPE_SUCCESS:
            return {
                ...state,
                recipeUpdated: true,
                recipe: action.recipe,
                error: null
            }
        case types.EDIT_RECIPE_DONE:
            return {
                ...state,
                recipeUdated: false,
                error: null
            }
        case types.LOADING:
            return {
                ...state,
                isLoading: true
            };
        case types.ERROR_OCCURED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case types.ADD_COMMENT: {
            let comment = [...state.recipe.comments];
            comment.push(payload);
            return {
                ...state,
                recipe: {
                    ...state.recipe,
                    comments: comment
                },
                iscreated: true
            }
        }
        default:
            return state;
    }
};

export default reducer;