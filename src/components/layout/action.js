import {push} from "connected-react-router";
import {actionLogOut} from "../authorization/login/actions";

export function doLogOut () {
    return dispatch => {
        localStorage.clear();
        dispatch({
            type: actionLogOut
        });
        dispatch(push('/'))
    }
}