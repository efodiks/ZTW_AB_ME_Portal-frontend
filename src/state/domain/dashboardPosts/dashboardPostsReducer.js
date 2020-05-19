import {actionAddPost, actionFetchPosts} from "./dashboardPostsActions";

export function dashboardPostsReducer (state = [], action) {
    switch (action.type) {
        case actionFetchPosts:
            return action.payload
        case actionAddPost:
            return [...state, action.payload]
        default:
            return state
    }
}