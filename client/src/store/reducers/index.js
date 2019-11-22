import { combineReducers } from "redux";

import recipeReducer from "./recipe";
import authReducer from "./auth";
import emailReducer from "./email";

// you'll have to combine them to one reducer.
// That's what we are doing here.

const rootReducer = combineReducers({
recipe: recipeReducer,
  auth: authReducer,
  email: emailReducer
});

export default rootReducer;
