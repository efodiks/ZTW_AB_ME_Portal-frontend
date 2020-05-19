import api from "../../../config/apiConfiguration";
import {performGenericRequest} from "../../request/requestActions";

export const feedComponent = "FEED"
export const actionFetchFeedPosts = `${feedComponent}/fetchPosts`

export function fetchFeedPosts() {
    const apiCall = () => api.get('posts')
    return performGenericRequest(feedComponent, actionFetchFeedPosts, apiCall)
}