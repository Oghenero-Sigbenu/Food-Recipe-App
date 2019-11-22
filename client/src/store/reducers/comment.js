import { START, COMMENT_FAILED, GET_COMMENTS, GET_ONE_COMMENT } from '../action/types';



const INITIAL = {
    iscreated: false,
    isLoading: true
}

export default (state = INITIAL, action) => {
    const { type, payload } = action;
    switch (type) {
        case START:
            return {
                ...state,
                isLoading: payload.isLoading
            }
        case COMMENT_FAILED:
            return {
                ...state,
                msg: payload,
                iscreated: false,
            }
        case GET_COMMENTS:
            return {
                ...state,
                comments: payload,
                isLoading: false
            }
        case GET_ONE_COMMENT:
            return {
                ...state,
                comment: payload,
                isLoading: false
            }
        default:
            return state
    }
}
