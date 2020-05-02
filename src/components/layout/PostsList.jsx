import React from 'react';
import {CardColumns, Container} from 'react-bootstrap';
import PostCard from './PostCard.jsx';
import { useEffect } from 'react';

const PostsList = ({posts, handleGetPosts}) => {

    useEffect(() => handleGetPosts(), []);

    return (
        <Container style={{marginTop: "1em", marginBottom: "1em"}}>
            <CardColumns>
                {posts.map(post =>
                    (<PostCard
                        key={post.id}
                        author={post.author}
                        imgSrc={post.url}
                        description={post.description}
                    />))}
            </CardColumns>
        </Container>
    );
};

export default PostsList;