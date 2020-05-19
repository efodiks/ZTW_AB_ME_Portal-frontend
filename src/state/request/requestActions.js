import {RequestActions} from "./requestReducer";

export function loadingPicker(state, componentName) {
    return state.request.loading.some(component => component === componentName)
}

export function errorPicker(state, componentName) {
    return state.request.error.some(component => component === componentName)
}

export function clearErrorPicker(dispatch, componentName) {
    return () => dispatch({
        type: RequestActions.actionClearError,
        payload: componentName
    })
}

export function performGenericRequest(componentName, actionName, apiCall, responseSideEffect = null, payload = null) {
    return async dispatch => {
        dispatch({
            type: RequestActions.actionRequest,
            payload: componentName
        })
        try {
            const response = await apiCall()
            const data = response.data
            const actionPayload = payload === null ? data : payload

            if (responseSideEffect !== null) {
                responseSideEffect(data, dispatch)
            }
            dispatch({
                type: RequestActions.actionSuccess,
                payload: componentName
            })

            dispatch({
                type: actionName,
                payload: actionPayload
            })
        } catch (e) {
            console.log(e)
            dispatch({
                type: RequestActions.actionError,
                payload: componentName
            })
        }
    }
}