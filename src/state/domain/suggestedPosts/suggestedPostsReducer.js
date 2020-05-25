import {actionFetchSuggestedPosts} from "./suggestedPostsActions";

export function suggestedPostsReducer(state = [], action) {
    if (action.type === actionFetchSuggestedPosts)
        return action.payload
    else
        return state
}