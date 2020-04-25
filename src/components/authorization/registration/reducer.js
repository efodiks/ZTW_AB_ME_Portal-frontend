import {actionRegisterFailed, actionRegisterLoading, actionRegisterSuccessful, actionClearErrors} from './actions';

const initialState = {
    loading: false,
    error: null
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionClearErrors:
            return {...state, error: null}
        case actionRegisterLoading:
            return {loading: true, error: null};
        case actionRegisterFailed:
            return {loading: false, error: action.error};
        case actionRegisterSuccessful:
            return {loading: false, error: null};
        default:
            return state;
    }
};