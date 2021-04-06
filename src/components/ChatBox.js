import React, { Component } from "react";
import firebase from "firebase/app";
import { db } from "../services/firebase";

const usersRef = firebase
.firestore()
.collection('users');

class ChatBox extends Component {

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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
          if (this.state.content === "") {
            console.log('Type something');
          } else {
            await db.ref("chats").push({
              content: this.state.content,
              timestamp: Date.now(),
              uid: this.state.user.uid,
            });
            this.setState({ content: '' });
          }
       
        } catch (error) {
          this.setState({ writeError: error.message });
        }
    }

    // Handle the change to all events
    handleChange(event) {
        this.setState({
          content: event.target.value
        });
    }

    // Time returned for the post in a readable format
    formatTime(timestamp) {
        const d = new Date(timestamp);
        const time = `${d.getHours()}:${d.getMinutes()}`;
        return time;
    }

    render() {
        return(
            <div className="chatBox">
              <div className="chatBox__container">
                <div className="chatBox__messages px-4 py-2">
                {this.state.chats.map(chat => {
                return <div className={"chatBox__messages--" + (this.state.user.uid === chat.uid ? "right" : "left")}>
                  <p key={chat.timestamp}></p>
                  <div>
                    
                  {this.state.usersInfo.filter(userInfo => userInfo.photoURL === this.state.user.uid)}
                    
                    <div className="chatBox__timestamp">
                      {this.formatTime(chat.timestamp)}
                    </div>
                  </div>
 
                  <div className={"chatBox__message-text chatBox__messages--" + (this.state.user.uid === chat.uid ? "green" : "blue")}>
                    {chat.content}
                  </div>
                </div>
                })}
                </div>
                <form onSubmit={this.handleSubmit} className="chatBox__form">
                  <input onChange={this.handleChange} value={this.state.content}  className="form-control" id="messageInput"></input>
                  {this.state.error ? <p>{this.state.writeError}</p> : null}
                  <button type="submit" className="chatBox__button">
                    <i className="fas fa-angle-double-right"></i>
                  </button>
                </form>
            </div>
          
          </div>
        )
    }    
}

export default ChatBox;