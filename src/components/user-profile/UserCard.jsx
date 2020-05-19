import React from 'react';
import Avatar from '../layout/Avatar.jsx';
import {Card, Container, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addFollow, removeFollow} from "../../state/domain/user/userActions";

const blankUserImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const mapStateToProps = state => {
    return {
        loggedInUser: state.loginState.loggedInUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleAddFollow: (loggedInUser, userToFollow) => dispatch(addFollow(loggedInUser, userToFollow)),
        handleRemoveFollow: (loggedInUser, userToUnfollow) => dispatch(removeFollow(loggedInUser, userToUnfollow))
    }
}

const UserCard = ({user, loggedInUser, handleAddFollow, handleRemoveFollow}) => {

    const followed = () => {
        if(!user.followedBy)
            return false
        return user.followedBy.some(followingUser => followingUser.uuid === loggedInUser.uuid)
    }

    const onClick = () => {
        if (followed())
            handleRemoveFollow(loggedInUser, user);
        else
            handleAddFollow(loggedInUser, user);
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
                    <Button variant={followed() ? "outline-info" : "info"} style={{width: "40%"}} onClick={onClick}>
                        {followed() ? "Unfollow" : "Follow"}
                    </Button>
                </div>
            </Card>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);