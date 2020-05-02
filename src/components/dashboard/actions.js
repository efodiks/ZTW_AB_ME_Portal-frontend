import api from '../../config/apiConfiguration';
import {push} from "connected-react-router";

export const actionAddPostSuccess = 'dashboard/addPostSuccess';
export const actionAddPostFailure = 'dashboard/addPostFailure';
export const actionGetUserPostsSuccess = 'dashboard/getUserPostsSuccess';
export const actionGetUserPostsFailure = 'dashboard/getUserPostsFailure';

export const doAddPost = postDTO => {
    return (dispatch) => {
        api.post('posts/create', postDTO)
            .then(response => dispatch(onSuccessfulAddPost(response.data)),
                error => onErrorAddPost(error));
    };
};

const onSuccessfulAddPost = postDto => {
    return (dispatch) => {
        dispatch({
            type: actionAddPostSuccess,
            post: postDto
        })
        dispatch(push('/dashboard/posts'))
    }
};

const onErrorAddPost = error => {
    console.log(error)
    return {
        type: actionAddPostFailure,
        error: error
    }
};

export function getUserPosts () {
    return (dispatch) => {
        api.get('posts/me')
            .then(response => dispatch(onSuccessfulGetUserPosts(response.data)),
               error => onErrorGetUserPosts(error));
    }
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