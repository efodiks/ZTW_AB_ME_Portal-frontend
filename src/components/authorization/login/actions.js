import api from '../../../config/apiConfiguration'

export const actionLoginLoading = 'authorization/loginLoading';
export const actionLoginFailed = 'authorization/loginFailed';
export const actionLoginSuccessful = 'authorization/loginSuccessful';
export const actionLogOut = 'authorization/loginLogOut';
export const clearLoginErrors = 'authorization/login/clearErrors';

export const actionAddFollowSuccess = 'authorization/addFollowSuccess';
export const actionAddFollowFailure = 'authorization/addFollowFailure';

export const actionRemoveFollowSuccess = 'authorization/removeFollowSuccess';
export const actionRemoveFollowFailure = 'authorization/removeFollowFailure';

export function doLoginRequest(loginDTO) {
    return (dispatch) => {
        dispatch({
            type: actionLoginLoading
        });
        api.post('authenticate', loginDTO)
            .then(response => dispatch(doLoginSuccessful(response.data)),
                error => dispatch(doLoginFailed(error)))
    }
}

export function doLoginFailed(error) {
    return {
        type: actionLoginFailed,
        error: error
    }
}

export function doLoginSuccessful(data) {
    localStorage.setItem('token', data.token.tokenString);
    localStorage.setItem('loggedInUser', JSON.stringify(data.userDto));
    return {
        type: actionLoginSuccessful,
        loggedInUser: data.userDto
    }
}

export const addFollow = (loggedInUser, userToFollow) => {
    const dto = {
        to: userToFollow.uuid
    }

    return (dispatch) => {
        api.put(`users/${loggedInUser.uuid}/addFollow`, dto)
            .then(() => dispatch(onSuccessfulAddFollow(loggedInUser, userToFollow)),
                error => dispatch(onErrorAddFollow(error)));
    };
}

const onSuccessfulAddFollow = (loggedInUser, userToFollow) => {
    localStorage.setItem('loggedInUser', JSON.stringify({...loggedInUser, following: [...loggedInUser.following, userToFollow]}));
    return {
        type: actionAddFollowSuccess,
        follow: userToFollow
    }
}

const onErrorAddFollow = error => {
    console.log(error);
    return {
        type: actionAddFollowFailure,
        error: error
    }
}

export const removeFollow = (loggedInUser, userToUnfollow) => {
    const dto = {
        to: userToUnfollow.uuid
    }

    return (dispatch) => {
        api.put(`users/${loggedInUser.uuid}/removeFollow`, dto)
            .then(() => dispatch(onSuccessfulRemoveFollow(loggedInUser, userToUnfollow)),
                error => dispatch(onErrorRemoveFollow(error)));
    };
}

const onSuccessfulRemoveFollow = (loggedInUser, userToUnfollow) => {
    const following = [...loggedInUser.following]
    const removedFollow = following.filter(user => user.uuid !== userToUnfollow.uuid)
    localStorage.setItem('loggedInUser', JSON.stringify({...loggedInUser, following: removedFollow}));

    return {
        type: actionRemoveFollowSuccess,
        unfollow: userToUnfollow
    }
}

const onErrorRemoveFollow = error => {
    console.log(error);
    return {
        type: actionRemoveFollowSuccess,
        error: error
    }
}
