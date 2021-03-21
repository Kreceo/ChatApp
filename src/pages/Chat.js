import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
        user: auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null
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

    handleChange(event) {
        this.setState({
          content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
          await db.ref("chats").push({
            content: this.state.content,
            timestamp: Date.now(),
            uid: this.state.user.uid
          });
          this.setState({ content: '' });
        } catch (error) {
          this.setState({ writeError: error.message });
        }
    }

    formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
    }

    render() {
      return (
          <div>
            <Header/>
            
            {/* Chat box */}
            <div className="d-flex flex-column chat-area" id="scroller">
              {this.state.chats.map(chat => {
                return <div className={"chat-bubble my-1 " + (this.state.user.uid === chat.uid ? "current-user" : "")}><p key={chat.timestamp}>
                {chat.content}
                <br/>
                <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
                </p>
                </div>
                
                
              })}
               <div id="anchor"></div>
            </div>
          
            {/* Input message section */}
            <form onSubmit={this.handleSubmit} className="d-flex chat-box">
              <input onChange={this.handleChange} value={this.state.content} className="form-control w-100"></input>
              {this.state.error ? <p>{this.state.writeError}</p> : null}
              <button type="submit" className="btn btn-primary">Send</button>
            </form>


            {/* <div>
              Login in as: <strong>{this.state.user.email}</strong>
            </div> */}

            <Footer/>
          </div>
        );
    }
}