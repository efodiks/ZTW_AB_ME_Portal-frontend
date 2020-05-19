import api from '../../../config/apiConfiguration'
import {performGenericRequest} from "../../request/requestActions";
import {push} from "connected-react-router";

export const dashboardComponent = 'DASHBOARD'

export const actionFetchPosts = `${dashboardComponent}/fetchPosts`
export const actionAddPost = `${dashboardComponent}/addPost`

export function fetchDashboardPosts() {
    const apiCall = () => api.get('posts/me')
    return performGenericRequest(dashboardComponent, actionFetchPosts, apiCall)
}

export function addPost(postDto) {
    const apiCall = () => api.post('posts/create', postDto)
    const sideEffect = (data, dispatch) => dispatch(push('/dashboard/posts'))

    return performGenericRequest(dashboardComponent, actionAddPost, apiCall, sideEffect)
}