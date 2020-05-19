import {actionFetchUser, actionFetchUserPosts, actionFollowUser, actionUnfollowUser} from "./userActions";

const defaultState = {
    user: {
        uuid: null,
        email: null,
        firstName: null,
        lastName: null,
        username: null,
        photoProfileUrl: null,
    },
    posts: []
}

export function userReducer(state = defaultState, action) {
    switch (action.type) {
        case actionFetchUser:
            return {...state, user: action.payload}
        case actionFetchUserPosts:
            return {...state, posts: action.payload}
        case actionFollowUser:
            return {...state,
                user: {...state.user,
                followedBy: [...state.user.followedBy, action.payload]}}
        case actionUnfollowUser:
            return {
                ...state,
                user: {...state.user,
                followedBy: state.user.followedBy.filter(u => u.uuid !== action.payload.uuid)}
            }
        default:
            return state
    }
}