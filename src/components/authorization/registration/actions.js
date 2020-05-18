import api from "../../../config/apiConfiguration";
import {push} from "connected-react-router";
import {doLoginRequest} from "../login/actions";
import {v4 as uuidv4} from 'uuid'


export const actionRegisterLoading = 'authorization/register/loading';
export const actionRegisterFailed = 'authorization/register/error';
export const actionRegisterSuccessful = 'authorization/register/success';
export const actionClearErrors = 'authorization/register/clearErrors';

export const doRegister = userDTO => {
    return dispatch => {
        dispatch({
            type: actionRegisterLoading
        });

        const userWithUuid = {...userDTO, uuid: uuidv4()}

        api.post('register', userWithUuid)
            .then(
                ignore => dispatch(doRegisterSuccessful(userWithUuid)),
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
};