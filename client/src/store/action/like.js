import { START, GET_LIKES, GET_RECIPE_LIKES, FAILED, ADD_LIKE } from './types';
import axios from "../../utils/axiox.base";

export const isLoading = () => {
    return {
        type: START,
        payload: {
            isLoading: true
        }
    }
};
export const failed = (msg) => {
    return {
        type: FAILED,
        payload: msg

    }
};

export const addLikeSuccess = (like) => {
    return {
        type: ADD_LIKE,
        payload: like
    }
};

export const getRecipeLikeSuccess = (data) => {
    return {
        type: GET_RECIPE_LIKES,
        payload: data.data
    } 
};
export const getLikeSuccess = (data) => {
    return {
        type: GET_LIKES,
        payload: data.data
    } 
};
export const addLike = (data) => {
    return (dispatch) => {
        axios.post("/like/add", data)
            .then(res => {
                dispatch(addLikeSuccess(res.data.data))
                console.log(res)
            })
            .catch(err => {
                dispatch(failed(err.msg))
            })
    }
}