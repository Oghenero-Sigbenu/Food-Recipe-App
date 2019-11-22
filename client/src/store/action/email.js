import { START, ADD_EMAIL, EMAIL_FAILED} from './types';
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
        type: EMAIL_FAILED,
        payload: msg

    }
};

export const addEmailSuccess = (msg) => {
    return {
        type: ADD_EMAIL,
        payload:msg.msg
    }
};

export const addEmail = (data) => {
    return (dispatch) => {
        axios.post("/email/post", data)
            .then(res => {
                dispatch(addEmailSuccess(res.data))
                console.log(res.data)
            })
            .catch(err => {
                dispatch(failed(err.msg))
            })
    }
};

