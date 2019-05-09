import * as types from "../action/types";

const initialState = { 
        recipes: [],
        recipe: null,
        isloading: false,
        error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_RECIPES_SUCCESS:
            return {
                ...state,
                recipe: action.recipe,
                isloading: false
                     }
        case types.ADD_RECIPE_SUCCESS:
            return {
                ...state,
                recipeCreated: false,
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
        // case types.ADD_RECIPES:
        //     return 	 state.concat([action.data]);
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
        default:
			return state;
}};

export default reducer;