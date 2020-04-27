import React from 'react';
import Avatar from '../layout/Avatar.jsx';
import {Card, Container} from 'react-bootstrap';

const blankUserImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const UserCard = ({user}) => {
    return (
        <Container style={{marginTop: "1em", marginBottom: "1em"}}>
             <Card>
                <div className="avatar-user-profile">
                    {user.url ? <Avatar imgSrc={user.url} size={15}/> : <Avatar imgSrc={blankUserImage} size={15}/>}
                </div>
                <div className="user-profile-username">
                    <h2>{user.username}</h2>
                </div>
            </Card>
        </Container>
    )
}

export default UserCard;