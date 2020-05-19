import {actionLogin, actionLogout} from "./loginActions";
import {actionFollowUser, actionUnfollowUser} from "../../domain/user/userActions";

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
        case actionFollowUser:
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    following: [...state.loggedInUser.following, action.payload]
                }
            }
        case actionUnfollowUser:
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    following: state.loggedInUser.following.filter(u => u.uuid !== action.payload)
                }
            }
        default:
            return state;
    }
};