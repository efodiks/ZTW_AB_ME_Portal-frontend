import {actionFetchFeedPosts} from "./feedPostsActions";

export function feedPostsReducer(state = [], action) {
    if (action.type === actionFetchFeedPosts)
        return action.payload
    else
        return state
}