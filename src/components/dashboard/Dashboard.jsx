import React from 'react';
import PostsList from '../layout/PostsList.jsx';
import {Row} from 'react-bootstrap';
import {connect} from "react-redux";
import {doAddPost, getUserPosts} from "./actions";
import {Route} from "react-router-dom";
import AddPost from "./AddPost";
import LoaderHoc from "../layout/LoaderHoc";

const mapStateToProps = state => {
    return {
        posts: state.dashboardState.posts,
        loading: state.dashboardState.loading,
        error: state.dashboardState.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleAddPost: postDTO => dispatch(doAddPost(postDTO)),
        handleGetMyPosts: () => dispatch(getUserPosts())
    }
};

const Dashboard = ({posts, loading, error, handleAddPost, handleGetMyPosts, match}) => {

    return (
        <div>
            <Row className="w-100">
                <Route path={`${match.path}/posts`} render={() => <LoaderHoc name="posts" loading={loading} loadData={handleGetMyPosts} Component={PostsList} posts={posts} />}/>
                <Route path={`${match.path}/addpost`} render={() => <AddPost handleAddPost={handleAddPost}/>}/>
            </Row>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);