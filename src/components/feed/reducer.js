import {actionGetAllPostsSuccess, actionGetAllPostsFailure} from "./actions";

const initialState = {
    posts: []
};

export const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionGetAllPostsSuccess:
            return {...state, posts: action.posts};
        case actionGetAllPostsFailure:
            throw action.error;
        default:
            return state;
    }
};