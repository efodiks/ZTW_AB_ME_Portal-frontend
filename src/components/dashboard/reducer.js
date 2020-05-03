import {
    actionAddPostFailure, actionAddPostSuccess,
    actionGetUserPostsSuccess, actionGetUserPostsFailure
} from "./actions";
import {actionGetAllPostsLoading} from "../feed/actions";

const initialState = {
    posts: [],
    loading: false,
    error: null
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionAddPostSuccess:
            return {...state, posts: [...state.posts, action.post]};
        case actionAddPostFailure:
            throw action.error;
        case actionGetAllPostsLoading:
            return {...state, loading: true}
        case actionGetUserPostsSuccess:
            return {...state, posts: action.posts, loading: false}
        case actionGetUserPostsFailure:
            return {...state, error: action.error, loading: false}
        default:
            return state
    }
};

