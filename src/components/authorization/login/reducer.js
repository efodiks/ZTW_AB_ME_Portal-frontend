import {actionLoginFailed, actionLoginLoading, actionLoginSuccessful, actionLogOut, clearLoginErrors} from "./actions";

const initialState = {
    loading: false,
    authorized: localStorage.getItem('token'),
    error: null
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case clearLoginErrors:
            return {error: null}
        case actionLoginLoading:
            return {loading: true, error: null, authorized: false};
        case actionLoginFailed:
            return {loading: false, error: action.error, authorized: false};
        case actionLoginSuccessful:
            return {loading: false, error: null, authorized: true};
        case actionLogOut:
            return {loading: false, error: null, authorized: false};
        default:
            return state;
    }
};