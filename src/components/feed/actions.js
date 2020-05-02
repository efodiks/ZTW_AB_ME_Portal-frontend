import api from '../../config/apiConfiguration';

export const actionGetAllPostsSuccess = 'feed/getAllPostsSuccess';
export const actionGetAllPostsFailure = 'feed/getAllPostsFailure';

export function getAllPosts () {
    return (dispatch) => {
        api.get('posts')
            .then(response => dispatch(onSuccessfulGetAllPosts(response.data)),
               error => onErrorGetAllPosts(error));
    }
}

const onSuccessfulGetAllPosts = posts => {
    return {
        type: actionGetAllPostsSuccess,
        posts: posts
    }
}

const onErrorGetAllPosts = error => {
    console.log(error)
    return {
        type: actionGetAllPostsFailure,
        error: error
    }
}