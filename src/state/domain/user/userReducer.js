import {actionFetchUser, actionFetchUserPosts} from "./userActions";

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
        default:
            return state
    }
}