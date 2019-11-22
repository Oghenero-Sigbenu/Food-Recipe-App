import { START, ADD_COMMENT, COMMENT_FAILED, GET_ONE_COMMENT } from './types';
import axios from "../../utils/axiox.base"                                                                                                                                                                                                                                      

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
        type: COMMENT_FAILED,
        payload: msg

    }
};

export const addCommentSuccess = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
};

export const getCommentSuccess = (data) => {
    return {
        type: GET_ONE_COMMENT,
        payload: data.data
    } 
};

export const addComment = (data) => {
    return (dispatch) => {
        axios.post("/comment/add", data)
            .then(res => {
                dispatch(addCommentSuccess(res.data.data))
            })
            .catch(err => {
                dispatch(failed(err.msg))
            })
    }
};

export const getComment = (id) => {
    return (dispatch) => {
        axios.get(`/comment/${id}`)
            .then(res => {
                dispatch(getCommentSuccess(res.data))
            })
            .catch(err => {
                dispatch(failed(err.msg))
            })
    }
}
