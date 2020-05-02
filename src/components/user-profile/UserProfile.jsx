import api from '../../config/apiConfiguration';
import React from 'react';
import UserCard from './UserCard.jsx';
import PostsList from '../layout/PostsList.jsx';
import {Row, Container, Col} from 'react-bootstrap';
import {getSpecificUserPosts, getSpecificUserData} from '../user-profile/actions';
import {connect} from "react-redux";
import { useEffect } from 'react';
import { useState } from 'react';
import {Redirect} from 'react-router-dom';

const mapStateToProps = state => {
    return {
        authorized: state.loginState.authorized,
        user: state.userProfileState.user,
        posts: state.userProfileState.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetSpecificUserData: userId => dispatch(getSpecificUserData(userId)),
        handleGetSpecificUserPosts: user => dispatch(getSpecificUserPosts(user))
    }
}

const UserProfile = ({authorized, user, posts, handleGetSpecificUserData, handleGetSpecificUserPosts, match}) => {

    useEffect(() => handleGetSpecificUserData(match.params.userId), []);

    return (
        authorized ? <div style={{margin: "1em 5em"}}>
            <Row className="justify-content-center">
                <Col lg={4}>
                    <UserCard user={user}/>
                </Col>
                <Col lg={8}>
                    <PostsList posts={posts} handleGetPosts={() => handleGetSpecificUserPosts(match.params.userId)}/>
                </Col>
            </Row>
        </div> : <Redirect to={"/"}/> 
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);