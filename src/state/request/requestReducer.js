export const RequestActions = {
    actionRequest: 'request/request',
    actionSuccess: 'request/success',
    actionError: 'request/error',
    actionClearError: 'request/clearError'
}

const defaultState = {
    loading: [],
    error: []
}

const {actionRequest, actionSuccess, actionError, actionClearError} = RequestActions

export const requestReducer = (state = defaultState, action) => {
    const name = action.payload

    switch (action.type) {
        case actionRequest:
            return {
                loading: addElement(name, state.loading),
                error: removeElement(name, state.error)
            }
        case actionSuccess:
            return {
                loading: removeElement(name, state.loading),
                error: removeElement(name, state.error)
            }
        case actionError:
            return {
                loading: removeElement(name, state.loading),
                error: addElement(name, state.error)
            }
        case actionClearError:
            return {
                ...state,
                error: removeElement(name, state.error)
            }
        default:
            return state
    }
}

function removeElement(element, list) {
    return list.filter(e => e !== element)
}

function addElement(element, list) {
    return [...list, element]
}