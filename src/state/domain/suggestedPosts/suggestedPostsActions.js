import api from "../../../config/apiConfiguration";
import {performGenericRequest} from "../../request/requestActions";

export const suggestedComponent = "SUGGESTED"
export const actionFetchSuggestedPosts = `${suggestedComponent}/fetchPosts`

export function fetchSuggestedPosts() {
    const apiCall = () => api.get('posts/suggested')
    return performGenericRequest(suggestedComponent, actionFetchSuggestedPosts, apiCall)
}