import api from '../../../config/apiConfiguration'
import {performGenericRequest} from "../../request/requestActions";
import {push} from "connected-react-router";

export const componentName = 'LOGIN'

export const actionLogin = `${componentName}/login`
export const actionLogout = `${componentName}/logout`

export function doLoginRequest(loginDTO) {
    const apiCall = () => api.post('authenticate', loginDTO)

    const loginSideEffect = (loginResponseDto, ignored) => {
        localStorage.setItem('token', loginResponseDto.token.tokenString)
        localStorage.setItem('loggedInUser', JSON.stringify(loginResponseDto.userDto))
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