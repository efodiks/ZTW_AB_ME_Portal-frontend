import {
    actionGetUserPostsSuccess, actionGetUserPostsFailure,
    actionGetUserDataSuccess, actionGetUserDataFailure, actionGetUserDataLoading, actionGetUserPostsLoading
} from "./actions";

const initialState = {
    user: {
        id: ""
    },
    userLoading: false,
    userError: false,
    posts: [],
    postsLoading: false,
    postsError: null
};

export const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionGetUserDataSuccess:
            return {...state, user: action.user, userLoading: false}
        case actionGetUserDataFailure:
            return {...state, userError: action.error, userLoading: false};
        case actionGetUserDataLoading:
            return {...state, userLoading: true}
        case actionGetUserPostsSuccess:
            return {...state, posts: action.posts, postsLoading: false}
        case actionGetUserPostsFailure:
            return {...state, postsLoading: action.error};
        case actionGetUserPostsLoading:
            return {...state, postsLoading: true}
        default:
            return state
    }
};