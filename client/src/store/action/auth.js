import axios from "../../utils/axiox.base"                                                                                                                                                                                                                                      
import * as types from "./types"

export const authStart = () => ({
    type: types.AUTH_START
  });

 export const authSuccess =(token, userId, user) => ({
    type: types.AUTH_SUCCESS,
    token,
    userId,
    user

 }); 

 export const authFailed = error => ({
    type: types.AUTH_FAILED,
    error
 });

 export const auth = (authData, callback) => {
	 console.log(authData)
    return (dispatch) => {
      dispatch(authStart())
      axios.post("/user/", authData)
        .then(res => {
          const {token, user} = res.data; 
          console.log(res.data)
          const userId = user.id;
          localStorage.setItem("token", token);
          localStorage.setItem("user", user);
		  dispatch(authSuccess(token, userId, user))
		  callback('/');
        })
        .catch(err => dispatch(authFailed(err)));
      }    
 }

 export const login = (authData, callback) => {
	console.log(authData)
   return (dispatch) => {
	 dispatch(authStart())
	 axios.post("/user/login", authData)
	   .then(res => {
		 const {token, user} = res.data; 
		 console.log(res.data)
		 const userId = user.id;
		 localStorage.setItem("token", token);
		 localStorage.setItem("user", user);
		 dispatch(authSuccess(token, userId, user))
		 callback('/');

	   })
	   .catch(err => dispatch(authFailed(err)));
	 }    
}

 export const toggleAuth = () => ({
    type: types.TOGGLE_AUTH
  });
  
   export const logout = () => ({
    type: types.LOGOUT_SUCCESS
  });

// Automatically logs in the user when the user visits the page
// but only does that if his/her credentials are still valid
// We call the at the root (App) component.
export const authAutoLogin = () => (dispatch, getState) => {
	const { token, userId } = getState().auth;
	if (!token) {
		dispatch(logout());
	} else {
		dispatch(authSuccess(token, userId));
	}
}; 

const loadAuthUserSuccess = user => ({
	type: types.LOAD_AUTH_USER_SUCCESS,
	user
});

export const loadAuthUser = () => (dispatch, getState) => {
	dispatch({ type: types.LOAD_AUTH_USER_START });
	const token = getState().auth.token;
	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	// If token, add to headers
	if (token) {
		config.headers["x-access-token"] = token;
	}
	axios
		.get("/auth/all", config)
		.then(res => {
			console.log(res.data);
			dispatch(loadAuthUserSuccess(res.data));
		})
		.catch(error =>
			dispatch({
				type: types.LOAD_AUTH_USER_FAILED,
				error: error.message
			})
		);
};