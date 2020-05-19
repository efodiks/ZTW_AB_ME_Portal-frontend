import api from "../../../config/apiConfiguration";
import {performGenericRequest} from "../../request/requestActions";

export const userComponent = 'USER_PROFILE'
export const userPostsComponent = `${userComponent}_POSTS`
export const userFollowButtonComponent = `${userComponent}_FOLLOW`

export const actionFetchUser = `${userComponent}/fetchUser`
export const actionFetchUserPosts = `${userPostsComponent}/fetchUserPosts`
export const actionFollowUser = `${userPostsComponent}/followUser`
export const actionUnfollowUser = `${userPostsComponent}/unfollowUser`

export function fetchUser(userUuid) {
    const apiCall = () => api.get(`users/${userUuid}`)
    return performGenericRequest(userComponent, actionFetchUser, apiCall)
}

export function fetchUserPosts(userUuid) {
    const apiCall = () => api.get(`users/${userUuid}/posts`)
    return performGenericRequest(userPostsComponent, actionFetchUserPosts, apiCall);
}

export function removeFollow (loggedInUser, userToUnfollow) {
    const dto = {
        to: userToUnfollow.uuid
    }
    const apiCall = () => api.put(`users/${loggedInUser.uuid}/removeFollow`, dto)
    return performGenericRequest(userFollowButtonComponent, actionUnfollowUser, apiCall, null, userToUnfollow)
}


export const addFollow = (loggedInUser, userToFollow) => {
    const dto = {
        to: userToFollow.uuid
    }
    const apiCall = () => api.put(`users/${loggedInUser.uuid}/addFollow`, dto)
    return performGenericRequest(userFollowButtonComponent, actionFollowUser, apiCall, null, userToFollow)
}
