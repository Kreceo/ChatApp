import React, { Component } from "react";
import firebase from "firebase/app";
import Profile from '../components/Profile';

const usersRef = firebase
.firestore()
.collection('users');

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        user: firebase.auth().currentUser,
        usersInfo: []
        };
    };

    async componentDidMount() {
    // Queries the database and returns the data, and mounts the function into the component for it to be used.
        usersRef
        .get()
        .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ usersInfo: data });
        });
    }
    
    render() {
        return (
            <div className="sideBar">
            <Profile />
            <h5 className="pl-3">Chat</h5>
            <div className="sideBar__profile">
                <div className="sideBar__scroll">
                {this.state.usersInfo.map(userInfo => {
                    return (
                    <a href="#">
                        <div className="d-flex align-items-center p-3">
                            <img src={userInfo.photoURL}/>
                            <span className="pl-2">{userInfo.username}</span>
                        </div>
                    </a>
                    )
                })
                }
                </div>
            </div>
            </div>
        )
    }
}

export default Sidebar;
