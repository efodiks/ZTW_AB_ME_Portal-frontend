import React from 'react';

const Avatar = ({ imgSrc, size = "3.5" }) => {

    return (
        <div className="profile-picture"
             style={{width: size+"em", height: size+"em", backgroundImage: `url(${imgSrc})`}}>
        </div>
    )
}

export default Avatar;