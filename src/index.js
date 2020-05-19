import React from 'react';
import thunkMiddleware from 'redux-thunk'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./state/application/login/loginReducer";
import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from 'history'
import {composeWithDevTools} from "redux-devtools-extension";
import {requestReducer} from "./state/request/requestReducer";
import {dashboardPostsReducer} from "./state/domain/dashboardPosts/dashboardPostsReducer";
import {feedPostsReducer} from "./state/domain/feedPosts/feedPostsReducer";
import {userReducer} from "./state/domain/user/userReducer";

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    request: requestReducer,
    loginState: loginReducer,
    dashboardPosts: dashboardPostsReducer,
    feedPosts: feedPostsReducer,
    user: userReducer
});

export const history = createBrowserHistory();

const composeEnhancers = composeWithDevTools({});

const store = createStore(createRootReducer(history),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            thunkMiddleware
        )));

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
