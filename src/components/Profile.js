import React from 'react';
import { auth } from '../services/firebase';

const ProfileCard = () => {
    return (
        <a className="d-flex align-items-center p-3" href="/settings">
            <div className="d-flex align-items-start">
                <Avatar img={auth().currentUser.photoURL}/>
                <div className="d-flex flex-column">
                    <Username/>
                    <OnlineStatus/>
                </div>
            </div>
        </a>
    )
}

export const Avatar = ({img}) => {
    return (
        <img src={img} className="profile-photo" alt=""/>
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
