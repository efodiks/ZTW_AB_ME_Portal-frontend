import React from 'react';
import UserCard from './UserCard.jsx';
import PostsList from '../layout/PostsList.jsx';
import {Col, Row} from 'react-bootstrap';
import {getSpecificUserData, getSpecificUserPosts} from './actions';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import LoaderHoc from "../layout/LoaderHoc";

const mapStateToProps = state => {
    return {
        authorized: state.loginState.authorized,
        user: state.userProfileState.user,
        userError: state.userProfileState.userError,
        userLoading: state.userProfileState.userLoading,
        posts: state.userProfileState.posts,
        postsError: state.userProfileState.postsError,
        postsLoading: state.userProfileState.postsLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetSpecificUserData: userId => dispatch(getSpecificUserData(userId)),
        handleGetSpecificUserPosts: user => dispatch(getSpecificUserPosts(user))
    }
}

const UserProfile = ({authorized, user, userLoading, posts, postsLoading, handleGetSpecificUserData, handleGetSpecificUserPosts, match}) => {

    return (
        authorized ? <div style={{margin: "1em 5em"}}>
            <Row className="justify-content-center">
                <Col lg={4}>
                    <LoaderHoc loading={userLoading} loadData={() => handleGetSpecificUserData(match.params.userId)}
                               Component={UserCard} name="user"
                               user={user}/>
                </Col>
                <Col lg={8}>
                    <LoaderHoc loading={postsLoading} loadData={() => handleGetSpecificUserPosts(match.params.userId)}
                               Component={PostsList} name="posts" posts={posts}/>
                </Col>
            </Row>
        </div> : <Redirect to={"/"}/>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);