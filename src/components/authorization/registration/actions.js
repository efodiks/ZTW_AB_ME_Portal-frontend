import api from "../../../config/apiConfiguration";
import {push} from "connected-react-router";
import {doLoginRequest} from "../login/actions";

export const actionRegisterLoading = 'authorization/register/loading';
export const actionRegisterFailed = 'authorization/register/error';
export const actionRegisterSuccessful = 'authorization/register/success';
export const actionClearErrors = 'authorization/register/clearErrors';

export const doRegister = userDTO => {
    return dispatch => {
        dispatch({
            type: actionRegisterLoading
        });

        api.post('register', userDTO)
            .then(
                ignore => dispatch(doRegisterSuccessful(userDTO)),
                error => dispatch(doRegisterFailed(error)));
    }
};

export function doRegisterFailed(error) {
    console.log(error);
    return {
        type: actionRegisterFailed,
        error: error
    }
}

const doRegisterSuccessful = (userDTO) => dispatch => {
    dispatch(push('/'));
    dispatch({
        type: actionRegisterSuccessful
    });
    dispatch(doLoginRequest({
        email: userDTO.email,
        password: userDTO.password
    }))
};