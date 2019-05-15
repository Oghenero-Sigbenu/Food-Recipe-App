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

 export const auth = authData => (dispatch, getState) => {
  console.log("register")

    dispatch(authStart());
    const isLogin = getState().auth.isLogin;
    let endPoint = null;
    let formData = null;
    const config = {
        headers: {}
    };

    //if not loggedIn register
    if(!isLogin) {
        config.headers["Content-type"] = "multipart/form-data";
        endPoint ="user";
        formData = new FormData();
        formData.append("firstname", authData.firstname);
        formData.append("lastname", authData.lastname);
        formData.append("username", authData.username);
        formData.append("email", authData.email);
        formData.append("password", authData.password);
        formData.append("imageUrl", authData.imageUrl);

    }
    else{
        config.headers["Content-Type"] = "application/json";
		endPoint = "auth";
		formData = authData;
    }

    axios.post("/" + endPoint, formData,config)
        .then(res => {
            const {token, user} = res.data; 
            console.log(res.data)
            const userId = user.id;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            dispatch(authSuccess(token, userId, user))

         })
         .catch(err => dispatch(authFailed(err)));
        
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