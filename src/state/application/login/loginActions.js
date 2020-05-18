import api from '../../../config/apiConfiguration'
import {performGenericRequest} from "../../request/requestActions";
import {push} from "connected-react-router";

export const componentName = 'LOGIN'

export const actionLogin = `${componentName}/login`
export const actionLogout = `${componentName}/logout`
export const actionAddFollow = `${componentName}/addFollow`

export function doLoginRequest(loginDTO) {
    const apiCall = () => api.post('authenticate', loginDTO)

    const loginSideEffect = (loginResponseDto, ignored) => {
        localStorage.setItem('token', loginResponseDto.token.tokenString)
    }

    return performGenericRequest(componentName, actionLogin, apiCall, loginSideEffect)
}

export function doLogout() {
    return dispatch => {
        localStorage.clear();
        dispatch({
            type: actionLogout
        });
        dispatch(push('/'))
    }
}

export const addFollow = (loggedInUser, userToFollow) => {
    const dto = {
        to: userToFollow.uuid
    }

/*    return (dispatch) => {
        api.put(`users/${loggedInUser.uuid}/addFollow`, dto)
            .then(() => dispatch(onSuccessfulAddFollow(loggedInUser, userToFollow)),
                error => dispatch(onErrorAddFollow(error)));
    };*/
}

const onSuccessfulAddFollow = (loggedInUser, userToFollow) => {
    localStorage.setItem('loggedInUser', JSON.stringify({
        ...loggedInUser,
        following: [...loggedInUser.following, userToFollow]
    }));
    return {
        type: 'login/addFollowSuccess',
        follow: userToFollow
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
        type: 'actionRemoveFollowSuccess',
        unfollow: userToUnfollow
    }
}

const onErrorRemoveFollow = error => {
    console.log(error);
    return {
        type: 'actionRemoveFollowSuccess',
        error: error
    }
}
