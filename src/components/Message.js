import React from 'react';
import { db } from "../services/firebase";
import { auth } from '../services/firebase';
import firebase from "firebase/app";
import {Avatar as AV} from './Profile';

const usersRef = firebase
.firestore()
.collection('users');

function Avatar() {
    const ProfileIcon = auth().currentUser.photoURL;

    if (ProfileIcon) {
        return <AV img={ProfileIcon} type="largeAV"/>;
    } else {
       return null;
    }
}
  
class Message extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
        user: firebase.auth().currentUser,
        chats: [],
        content:  '',
        readError: null,
        writeError: null,
        usersInfo: []
        };
    }

    async componentDidMount() {
      this.setState({ readError: null });
      try {
      db.ref("chats").on("value", snapshot => {
          let chats = [];
          snapshot.forEach((snap) => {
          chats.push(snap.val());
          });
          this.setState({ chats });
      });
      } catch (error) {
      this.setState({ readError: error.message });
      }
       // Queries the database and returns the data, and mounts the function into the component for it to be used.
      usersRef
      .get()
      .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      this.setState({ usersInfo: data });
      });
    }

    formatTime(timestamp) {
        const d = new Date(timestamp);
        const time = `${d.getHours()}:${d.getMinutes()}`;
        return time;
    }
  
    render() {
        return(
            <>
            {this.state.chats.map(chat => {
            return (
                <div className={"chatBox__messages--" + (this.state.user.uid === chat.uid ? "right" : "left")}>
                    <p key={chat.timestamp}></p>
                    <div>
                    <Avatar/>
                    <div className="chatBox__timestamp">
                        {this.formatTime(chat.timestamp)}
                    </div>
                    </div>

                    <div className={"chatBox__message-text chatBox__messages--" + (this.state.user.uid === chat.uid ? "green" : "blue")}>
                    {chat.content}
                    
                    </div>
                </div>
            )
            })}
            </>
        );
    }
  }

export default Message;