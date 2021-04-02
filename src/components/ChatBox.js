import React, { Component } from "react";
import firebase from "firebase/app";
import { db } from "../services/firebase";

class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
        user: firebase.auth().currentUser,
        chats: [],
        content:  '',
        readError: null,
        writeError: null,
        username: '',
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
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
          await db.ref("chats").push({
            content: this.state.content,
            timestamp: Date.now(),
            uid: this.state.user.uid,
          });
          this.setState({ content: '' });
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
            <div className="chatContent">
              <div className="w-100 px-3 h-100">
                <div className="chat-messages px-4 py-2">
                {this.state.chats.map(chat => {
                return <div className={"mb-4 chat-message-" + (this.state.user.uid === chat.uid ? "right" : "left")}><p key={chat.timestamp}></p>
                    <div>
                    <img src={this.state.user.photoURL} className="rounded-circle mr-1" width="40" height="40" />
                    <div className="text-muted small text-nowrap mt-2">{this.formatTime(chat.timestamp)}</div>
                    </div>
                    <div className={"flex-shrink-1 rounded py-2 px-3 mr-3 " + (this.state.user.uid === chat.uid ? "bg-green" : "bg-blue")}>
                    {chat.content}
                    </div>
                </div>
                })}
                </div>
                <form onSubmit={this.handleSubmit} className="d-flex p-3">
                <input onChange={this.handleChange} value={this.state.content}  className="form-control w-100" id="messageInput"></input>
                {this.state.error ? <p>{this.state.writeError}</p> : null}
                <button type="submit" className="btn btn-primary chat-btn"><i className="fas fa-angle-double-right"></i></button>
            </form>
            </div>
          
          </div>
        )
    }    
}

export default ChatBox;