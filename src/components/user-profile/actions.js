import api from '../../config/apiConfiguration';

export const actionGetUserPostsSuccess = 'user-profile/getUserPostsSuccess';
export const actionGetUserPostsFailure = 'user-profile/getUserPostsFailure';
export const actionGetUserPostsLoading = 'user-profile/getUserPostsLoading';

export const actionGetUserDataSuccess = 'user-profile/getUserDataSuccess';
export const actionGetUserDataFailure = 'user-profile/getUserDataFailure';
export const actionGetUserDataLoading = 'user-profile/getUserLoading';


export const getSpecificUserPosts = userId => {
    return (dispatch) => {
        dispatch({type: actionGetUserPostsLoading})
        api.get(`users/${userId}/posts`, userId)
            .then(response => dispatch(onSuccessfulGetUserPosts(response.data)),
                error => onErrorGetUserPosts(error));
    };
}

const onSuccessfulGetUserPosts = posts => {
    return {
        type: actionGetUserPostsSuccess,
        posts: posts
    }
}

const onErrorGetUserPosts = error => {
    console.log(error)
    return {
        type: actionGetUserPostsFailure,
        error: error
    }
}

export const getSpecificUserData = userId => {
    return (dispatch) => {
        dispatch({type: actionGetUserDataLoading})
        api.get(`users/${userId}`, userId)
            .then(response => dispatch(onSuccessfulGetUserData(response.data)),
                error => onErrorGetUserData(error));
    };
}

const onSuccessfulGetUserData = user => {
    return {
        type: actionGetUserDataSuccess,
        user: user
    }
}

const onErrorGetUserData = error => {
    console.log(error)
    return {
        type: actionGetUserDataFailure,
        error: error
    }
}