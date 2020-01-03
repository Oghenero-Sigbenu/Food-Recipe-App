import axios from "../../utils/axiox.base"
import * as types from "./types"

export const authStart = () => ({
  type: types.AUTH_START, payload: {
    isloading: true
  }
});

export const authSuccess = (token, userId, user, msg) => ({
    type: types.AUTH_SUCCESS,
    payload: {
      token,
      userId,
      user,
      msg
    }
  
  });

  export const authFailed = msg => ({
    type: types.AUTH_FAILED,
    payload: msg
  });

  export const auth = (authData, redirect) => {
    return (dispatch) => {
      dispatch(authStart())
      axios.post("/user/", authData)
        .then(res => {
          const { token, user } = res.data;
          console.log(token)
          localStorage.setItem("token", token);
          // localStorage.mtoken = token;
          // localStorage.mUser = JSON.stringify(user);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(user, token))
          console.log(user,token)
          // redirect('/');
        })
        .catch(err => console.log(err));
    }
  };

  export const logout = () => {
  return {
    type: types.LOGOUT_SUCCESS
  }
};