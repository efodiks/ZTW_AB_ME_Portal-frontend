import api from '../../../config/apiConfiguration'

export const actionLoginLoading = 'authorization/loginLoading';
export const actionLoginFailed = 'authorization/loginFailed';
export const actionLoginSuccessful = 'authorization/loginSuccessful';
export const actionLogOut = 'authorization/loginLogOut';
export const clearLoginErrors = 'authorization/login/clearErrors';

export function doLoginRequest(loginDTO) {
    return (dispatch) => {
        dispatch({
            type: actionLoginLoading
        });
        api.post('authenticate', loginDTO)
            .then(response => dispatch(doLoginSuccessful(response.data.tokenString)),
                error => dispatch(doLoginFailed(error)))
    }
}

export function doLoginFailed(error) {
    return {
        type: actionLoginFailed,
        error: error
    }
}

export function doLoginSuccessful(token) {
    localStorage.setItem('token', token);
    return {
        type: actionLoginSuccessful
    }
}