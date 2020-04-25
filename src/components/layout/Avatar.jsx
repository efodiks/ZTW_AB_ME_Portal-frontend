import React from 'react';
import { Image } from 'react-bootstrap';

const Avatar = ({ imgSrc, size = "3.5" }) => {

    return (
        <div className="profile-picture" style={{width: size+"em", height: size+"em"}}>
            {/* [ME] removing attribute 'responsive' because it causes an error: Received `true` for a non-boolean attribute `responsive`. What should it do? */ }
            <Image src={imgSrc}/>
        </div>
    )
}

export default Avatar;