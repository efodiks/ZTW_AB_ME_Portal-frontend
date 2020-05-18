import React, {useState, useEffect} from 'react';
import Avatar from '../layout/Avatar.jsx';
import {Card, Container, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addFollow} from '../authorization/login/actions';
import {removeFollow} from '../authorization/login/actions';

const blankUserImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const mapStateToProps = state => {
    return {
        loggedInUser: state.loginState.loggedInUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleAddFollow: (loggedInUser, followDto) => dispatch(addFollow(loggedInUser, followDto)),
        handleRemoveFollow: (loggedInUser, followDto) => dispatch(removeFollow(loggedInUser, followDto))
    }
}

const UserCard = ({user, loggedInUser, handleAddFollow, handleRemoveFollow}) => {

    const [followed, setFollowed] = useState(() => {
        if (loggedInUser.following.some(followedUser => followedUser === user.id))
            return true;
        return false;
    });

    const onClick = () => {
        const followDto = {
            to: user.uuid
        };
        if (followed)
            handleRemoveFollow(loggedInUser, followDto);
        else
            handleAddFollow(loggedInUser, followDto);
    }

    return (
        <Container style={{marginTop: "1em", marginBottom: "1em"}}>
             <Card>
                <div className="avatar-user-profile">
                    {user.profilePhotoUrl ? <Avatar imgSrc={user.profilePhotoUrl} size={15}/> : <Avatar imgSrc={blankUserImage} size={15}/>}
                </div>
                <div className="user-profile-username">
                    <h2>{user.username}</h2>
                </div>
                <div style={{display: "flex", justifyContent: "center", marginBottom: "3em"}}>
                    <Button variant={followed ? "outline-info" : "info"} style={{width: "40%"}} onClick={onClick}>
                        {followed ? "Unfollow" : "Follow"}
                    </Button>
                </div>
            </Card>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);