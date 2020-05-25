import React from 'react';
import {connect} from "react-redux";
import {Row} from 'react-bootstrap';
import PostsList from '../layout/PostsList';
import LoaderHoc from "../layout/LoaderHoc";
import {errorPicker, loadingPicker} from "../../state/request/requestActions";
import {suggestedComponent, fetchSuggestedPosts} from "../../state/domain/suggestedPosts/suggestedPostsActions";

const mapStateToProps = state => {
    return {
        posts: state.suggestedPosts,
        error: errorPicker(state, suggestedComponent),
        loading: loadingPicker(state, suggestedComponent)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleGetPosts: () => dispatch(fetchSuggestedPosts())
    }
};

const Suggested = ({posts, error, loading, handleGetPosts}) => {
    return (
        <div>
            <Row className="w-100">
                <LoaderHoc loading={loading}
                           name="suggested posts"
                           Component={PostsList}
                           loadData={handleGetPosts}
                           posts={posts}/>
            </Row>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggested);