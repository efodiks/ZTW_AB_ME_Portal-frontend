import {
    actionLoginLoading,
    actionLoginSuccessful,
    actionLoginFailed,
    actionRegisterLoading,
    actionRegisterSuccessful,
    actionRegisterFailed,
    actionLogOut, clearLoginErrors
} from './actions'

const initialState = {
    loading: false,
    authorized: localStorage.getItem('token'),
    error: null
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case clearLoginErrors:
            return {...state, error: null}
        case actionLoginLoading:
        case actionRegisterLoading:
            return {...state, loading: true, error: null, authorized: false};
        case actionLoginFailed:
        case actionRegisterFailed:
            return {...state, loading: false, error: action.error, authorized: false};
        case actionRegisterSuccessful:
            return {...state, loading: false, error: null, authorized: false};
        case actionLoginSuccessful:
            return {...state, loading: false, error: null, authorized: true};
        case actionLogOut:
            return {...state, loading: false, error: null, authorized: false};
        default:
            return state;
    }
};