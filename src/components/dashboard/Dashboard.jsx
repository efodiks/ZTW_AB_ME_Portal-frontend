import React from 'react';
import PostsList from '../layout/PostsList.jsx';
import {Row} from 'react-bootstrap';
import {connect} from "react-redux";
import {doAddPost, getUserPosts} from "./actions";
import {Route} from "react-router-dom";
import AddPost from "./AddPost";
import { useEffect } from 'react';

const mapStateToProps = state => {
    return {
        posts: state.dashboardState.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleAddPost: postDTO => dispatch(doAddPost(postDTO)),
        handleGetMyPosts: () => dispatch(getUserPosts())
    }
};

const Dashboard = ({posts, handleAddPost, handleGetMyPosts, match}) => {

    return (
        <div>
            <Row className="w-100">
                <Route path={`${match.path}/posts`} render={() => <PostsList posts={posts} handleGetPosts={handleGetMyPosts}/>}/>
                <Route path={`${match.path}/addpost`} render={() => <AddPost handleAddPost={handleAddPost}/>}/>
            </Row>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);