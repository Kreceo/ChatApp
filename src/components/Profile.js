import React from 'react';
import { auth } from '../services/firebase';

const ProfileCard = () => {
    return (
        <a className="d-flex align-items-center p-3" href="/settings">
            <div className="d-flex align-items-start">
                <Avatar/>
                <div className="d-flex flex-column">
                    <Username/>
                    <OnlineStatus/>
                </div>
            </div>
        </a>
    )
}

const Avatar = () => {
    return (
        <img src={auth().currentUser.photoURL} className="profile-photo" alt=""/>
    )
}

const Username = () => {
    return (
        <span className="pl-2">{auth().currentUser.displayName}</span>
    )
}

const OnlineStatus = () => {
    return (
        <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
    )
}

class Profile extends React.Component { 
    render() { 
        return ( 
            <ProfileCard/>
        )
    };
};

export default Profile;
