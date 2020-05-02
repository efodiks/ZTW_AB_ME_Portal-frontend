import {actionGetUserPostsSuccess, actionGetUserPostsFailure,
        actionGetUserDataSuccess, actionGetUserDataFailure} from "./actions";

const initialState = {
    user: {
        id: ""
    },
    posts: []
};

export const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionGetUserDataSuccess:
            return {...state, user: action.user}
        case actionGetUserDataFailure:
            throw action.error;
        case actionGetUserPostsSuccess:
            return {...state, posts: action.posts}
        case actionGetUserPostsFailure:
            throw action.error;
        default:
            return state
    }
};