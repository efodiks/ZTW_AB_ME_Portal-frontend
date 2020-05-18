import {actionLogin, actionLogout} from "./loginActions";

const initialState = {
    authorized: localStorage.getItem('token'),
    loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')),
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionLogin:
            const {token, userDto} = action.payload
            return {
                authorized: token.tokenString,
                loggedInUser: userDto
            }
        case actionLogout:
            return {}
        default:
            return state;
    }
};