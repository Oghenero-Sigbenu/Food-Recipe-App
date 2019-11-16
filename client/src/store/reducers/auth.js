import * as types from "../action/types";

// const initialState ={
//     token: localStorage.getItem("token"),
//      user: JSON.parse(localStorage.getItem('user')),
//     // user: null,
//     isLoading : false,
//     error: null,
//     isLoggedin:  localStorage.getItem('token') ? true : false,
// };
const token = localStorage.myToken;
const checkToken = token != null ? true : false;

const initialState = {
  token,
  isLoggedIn: checkToken,
  user: JSON.parse(localStorage.getItem('user')),
  isLoading: false
}


const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.AUTH_START:
        case types.LOAD_AUTH_USER_START: 
            return {
                ...state,
                isLoading: true
            };
        case types.AUTH_SUCCESS:
            return {
                ...state,
                token:payload.token,
                user:payload.user,
                userId: payload.userId,
                isLoading: false,
                isLoggedIn: true,
                error: null,
            };
        case types.AUTH_FAILED:
        case types.LOGOUT_SUCCESS:
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
            return {
                ...state,
                token: null,
                userId: null,
                user: null,
                isLoading: false,
                error: action.error
            }
        case types.TOGGLE_AUTH:
            return {
                ...state,
                isLogin: !state.isLogin
      };
      case types.LOAD_AUTH_USER_SUCCESS:
			return {
				...state,
				user: action.user,
				isLoading: false
            };
            default:
            return state;
    }
};

export default reducer;