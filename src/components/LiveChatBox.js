import React, { Component } from "react";
import firebase from "firebase/app";
import { db } from "../services/firebase";
import Message from "./Message";


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

    render() {
        return(
            <div className="chatBox">
              <div className="chatBox__container">
                <div className="chatBox__messages px-4 py-2">
                  <Message/>
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