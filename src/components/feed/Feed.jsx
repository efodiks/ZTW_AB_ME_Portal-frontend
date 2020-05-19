import React from 'react';
import {connect} from "react-redux";
import {Row} from 'react-bootstrap';
import PostsList from '../layout/PostsList';
import LoaderHoc from "../layout/LoaderHoc";
import {errorPicker, loadingPicker} from "../../state/request/requestActions";
import {feedComponent, fetchFeedPosts} from "../../state/domain/feedPosts/feedPostsActions";

const mapStateToProps = state => {
    return {
        posts: state.feedPosts,
        error: errorPicker(state, feedComponent),
        loading: loadingPicker(state, feedComponent)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleGetAllPosts: () => dispatch(fetchFeedPosts())
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