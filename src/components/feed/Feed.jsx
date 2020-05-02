import React from 'react';
import {connect} from "react-redux";
import {Row} from 'react-bootstrap';
import PostsList from '../layout/PostsList';
import {getAllPosts} from '../feed/actions';
import {useEffect} from 'react';

const mapStateToProps = state => {
    return {
        posts: state.feedState.posts
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleGetAllPosts: () => dispatch(getAllPosts())
    }
};

const Feed = ({posts, handleGetAllPosts}) => {

    return (
        <div>
            <Row className="w-100">
                <PostsList posts={posts} handleGetPosts={handleGetAllPosts} />
            </Row>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);