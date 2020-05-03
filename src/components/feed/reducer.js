import {actionGetAllPostsSuccess, actionGetAllPostsFailure, actionGetAllPostsLoading} from "./actions";

const initialState = {
    posts: [],
    loading: false,
    error: null
};

export const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionGetAllPostsSuccess:
            return {...state, posts: action.posts, loading: false};
        case actionGetAllPostsFailure:
            return {...state, error: action.error, loading: false};
        case actionGetAllPostsLoading:
            return {...state, loading: true}
        default:
            return state;
    }
};