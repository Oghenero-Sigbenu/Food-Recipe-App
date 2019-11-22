import { START, ADD_EMAIL,EMAIL_FAILED } from '../action/types';

const INITIAL = {
    isLoading: false
}

export default (state = INITIAL, action) => {
    const { type, payload } = action;
    switch (type) {
        case START:
            return {
                ...state,
                isLoading: payload.isLoading
            }
        case ADD_EMAIL:
            return {
                ...state,
                msg: payload,
                isCreated: true,
                isLoading: false,
            }
        case EMAIL_FAILED:
            return {
                ...state,
                msg: payload,
                isLoading: false
            }
        default:
            return state
    }
}