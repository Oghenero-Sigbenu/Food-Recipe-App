import { 
     LOAD_AUTH_USER_SUCCESS, 
     TOGGLE_AUTH, LOGOUT_SUCCESS, 
     AUTH_START, AUTH_FAILED, AUTH_SUCCESS, 
     LOGINFAILED, LOAD_AUTH_USER_START, 
    } from "../action/types";

const token = localStorage.getItem("token");
const checkToken = localStorage.getItem('token') ? true : false;

const initialState = {
    token,
    isLoggedIn: checkToken,
    user: JSON.parse(localStorage.getItem('user')),
    isLoading: false,
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case AUTH_START:
        case LOAD_AUTH_USER_START:
            return {
                ...state,
                isLoading: payload.isLoading
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                token: payload.token,
                user: payload.user,
                userId: payload.userId,
                isLoading: false,
                isLoggedIn: true,
                error: null,
                msg: payload.msg
            };
        case LOGINFAILED:
            return {
                ...state,
                msg: payload,
                isLoading: false
            };
        case AUTH_FAILED:
        case LOGOUT_SUCCESS:
            // delete localStorage.mtoken;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                userId: null,
                user: null,
                isLoading: false,
                error: action.error
            }
        case TOGGLE_AUTH:
            return {
                ...state,
                isLogin: !state.isLogin
            };
        case LOAD_AUTH_USER_SUCCESS:
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