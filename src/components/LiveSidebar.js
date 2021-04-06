import React, { Component } from "react";
import firebase from "firebase/app";

const usersRef = firebase
.firestore()
.collection('users');

// var user = firebase.auth().currentUser;

// if (user != null) {
//     console.log('all fine');
//     }  else {
//     document.getElementById('.hide');
//     hide.classList.add('hide');
// }
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        user: firebase.auth().currentUser,
        usersInfo: [],
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

    handleChange(event) {
        this.setState({
          content: event.target.value
        });
    }

    
    render() {
        return (
            <div className="sideBar">
            {/* <Profile />  COME BACK TO THIS */}
            <h5 className="pl-3">Chat</h5>
            
            <div className="sideBar__profile">
                <div className="sideBar__scroll">
                {this.state.usersInfo.map(userInfo => {
                    return (
                    <a href="javascript:void(0)">
                        <div className="sideBar__card">
                            <img src={userInfo.photoURL} alt=""/>
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
