import api from '../../../config/apiConfiguration'
import {v4 as uuidv4} from "uuid";
import {performGenericRequest} from "../../request/requestActions";
import {push} from 'connected-react-router'

export const registerComponent = 'REGISTER'
export const actionRegister = `${registerComponent}/register`

export function doRegister(registerDto) {

    const userWithUuid = {...registerDto, uuid: uuidv4()}
    const registerCall = () => api.post('register', userWithUuid)

    const sideEffect = (ignored, dispatch) => {
        dispatch(push('/'))
    }

    return performGenericRequest(registerComponent, actionRegister, registerCall, sideEffect)
}