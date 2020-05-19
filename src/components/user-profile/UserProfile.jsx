import React from 'react';
import UserCard from './UserCard.jsx';
import PostsList from '../layout/PostsList.jsx';
import {Col, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import LoaderHoc from "../layout/LoaderHoc";
import {errorPicker, loadingPicker} from "../../state/request/requestActions";
import {fetchUser, fetchUserPosts, userComponent, userPostsComponent} from "../../state/domain/user/userActions";

const mapStateToProps = state => {
    return {
        authorized: state.loginState.authorized,
        user: state.user.user,
        errorUser: errorPicker(state, userComponent),
        errorUserPosts: errorPicker(state, userPostsComponent),
        loadingUser: loadingPicker(state, userComponent),
        loadingUserPosts: loadingPicker(state, userPostsComponent),
        posts: state.user.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetSpecificUserData: userUuid => dispatch(fetchUser(userUuid)),
        handleGetSpecificUserPosts: userUuid => dispatch(fetchUserPosts(userUuid))
    }
}

const UserProfile = ({authorized, user, posts, loadingUser, loadingUserPosts, handleGetSpecificUserData, handleGetSpecificUserPosts, match}) => {

    return (
        authorized ? <div style={{margin: "1em 5em"}}>
            <Row className="justify-content-center">
                <Col lg={4}>
                    <LoaderHoc loading={loadingUser} loadData={() => handleGetSpecificUserData(match.params.userId)}
                               Component={UserCard} name="user"
                               user={user}/>
                </Col>
                <Col lg={8}>
                    <LoaderHoc loading={loadingUserPosts} loadData={() => handleGetSpecificUserPosts(match.params.userId)}
                               Component={PostsList} name="posts" posts={posts}/>
                </Col>
            </Row>
        </div> : <Redirect to={"/"}/>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);