import React from 'react';
import PostsList from '../layout/PostsList.jsx';
import {Row} from 'react-bootstrap';
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import AddPost from "./AddPost";
import LoaderHoc from "../layout/LoaderHoc";
import {addPost, dashboardComponent, fetchDashboardPosts} from "../../state/domain/dashboardPosts/dashboardPostsActions";
import {loadingPicker, errorPicker} from "../../state/request/requestActions";

const mapStateToProps = state => {
    return {
        posts: state.dashboardPosts,
        loading: loadingPicker(state, dashboardComponent),
        error: errorPicker(state, dashboardComponent)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleAddPost: postDTO => dispatch(addPost(postDTO)),
        handleGetMyPosts: () => dispatch(fetchDashboardPosts())
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