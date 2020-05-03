import React from 'react';
import {connect} from "react-redux";
import {Row} from 'react-bootstrap';
import PostsList from '../layout/PostsList';
import {getAllPosts} from './actions';
import LoaderHoc from "../layout/LoaderHoc";

const mapStateToProps = state => {
    return {
        posts: state.feedState.posts,
        error: state.feedState.error,
        loading: state.feedState.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleGetAllPosts: () => dispatch(getAllPosts())
    }
};

const Feed = ({posts, error, loading, handleGetAllPosts}) => {

    return (
        <div>
            <Row className="w-100">
                <LoaderHoc loading={loading}
                           name="Feed"
                           Component={PostsList}
                           loadData={handleGetAllPosts}
                           posts={posts}/>
            </Row>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);