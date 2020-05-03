import React from 'react';
import Avatar from '../layout/Avatar.jsx';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const PostCard = ({ author, imgSrc, description }) => {
    
    return (
        <Card style={{padding: "0.5em"}}>
            <Link to={`/user/${author.uuid}`} className="user-link">
                <div style={{display: "inline-flex", alignItems: "center", margin: "0em 0.2em 0.5em 0.2em"}}>
                    {author.profilePhotoUrl && <Avatar
                        imgSrc={author.profilePhotoUrl}
                        size="3.5"
                    />}
                    <Card.Title className="m-3">{author.username}</Card.Title>
                </div>
            </Link>
            <Card.Img variant="top" src={imgSrc}/>
            <Card.Body style={{padding: "0.2em"}}>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PostCard;