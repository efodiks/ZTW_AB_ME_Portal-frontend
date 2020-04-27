import api from '../../config/apiConfiguration';
import React from 'react';
import UserCard from './UserCard.jsx';
import PostsList from '../layout/PostsList.jsx';
import {Row, Container, Col} from 'react-bootstrap';
import {getSpecificUserPosts} from '../dashboard/actions';
import {connect} from "react-redux";
import { useEffect } from 'react';
import { useState } from 'react';
import {Redirect} from 'react-router-dom';

const mapStateToProps = state => {
    return {
        authorized: state.loginState.authorized
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetSpecificUserPosts: user => dispatch(getSpecificUserPosts(user))
    }
}

const UserProfile = ({authorized, handleGetSpecificUserPosts, match}) => {

    const [user, setUser] = useState({
        id: match.params.userId
    });

    useEffect(() => {
        api.get(`users/${user.id}`, user.id)
            .then(response => setUser(response.data));
    }, []);

    return (
        authorized ? <div style={{margin: "1em 5em"}}>
            <Row className="justify-content-center">
                <Col lg={4}>
                    <UserCard user={user}/>
                </Col>
                <Col lg={8}>
                    <PostsList handleGetPosts={handleGetSpecificUserPosts(user)}/>
                </Col>
            </Row>
        </div> : <Redirect to={"/"}/> 
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);