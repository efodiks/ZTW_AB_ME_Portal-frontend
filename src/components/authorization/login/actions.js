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

export const addFollow = (loggedInUser, followDto) => {
    return (dispatch) => {
        api.put(`users/${loggedInUser.uuid}/addFollow`, loggedInUser.uuid, followDto)
            .then(() => dispatch(onSuccessfulAddFollow(followDto)),
                error => dispatch(onErrorAddFollow(error)));
    };
}

const onSuccessfulAddFollow = followDto => {
    console.log(followDto);
    return {
        type: actionAddFollowSuccess,
        follow: followDto
    }
}

const onErrorAddFollow = error => {
    console.log(error);
    return {
        type: actionAddFollowFailure,
        error: error
    }
}

export const removeFollow = (loggedInUser, followDto) => {
    return (dispatch) => {
        api.put(`users/${loggedInUser.uuid}/removeFollow`, loggedInUser.uuid, followDto)
            .then(() => dispatch(onSuccessfulRemoveFollow(followDto)),
                error => dispatch(onErrorRemoveFollow(error)));
    };
}

const onSuccessfulRemoveFollow = followDto => {
    return {
        type: actionAddFollowSuccess,
        follow: followDto
    }
}

const onErrorRemoveFollow = error => {
    console.log(error);
    return {
        type: actionAddFollowFailure,
        error: error
    }
}
