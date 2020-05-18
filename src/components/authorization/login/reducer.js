import {actionLoginFailed, actionLoginLoading, actionLoginSuccessful, actionLogOut, clearLoginErrors,
        actionAddFollowSuccess, actionAddFollowFailure, actionRemoveFollowSuccess, actionRemoveFollowFailure
} from "./actions";

const initialState = {
    loading: false,
    authorized: localStorage.getItem('token'),
    loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')),
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
            return {loading: false, error: null, authorized: true, loggedInUser: action.loggedInUser};
        case actionLogOut:
            return {loading: false, error: null, authorized: false};
        case actionAddFollowSuccess:
            return {...state, loggedInUser: {...state.loggedInUser, following: [...state.loggedInUser.following, action.follow]}};
        case actionAddFollowFailure:
            throw action.error;
        case actionRemoveFollowSuccess:
            const following = [...state.loggedInUser.following]
            const removedFollow = following.filter(user => user.uuid !== action.unfollow.uuid)
            return {...state, loggedInUser: {...state.loggedInUser, following: removedFollow}};
        case actionRemoveFollowFailure:
            throw action.error;
        default:
            return state;
    }
};