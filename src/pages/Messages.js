import React, { Component } from "react";
// import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import Header from '../components/Header';
import Footer from '../components/Footer';
import firebase from "firebase/app";

const usersRef = firebase
.firestore()
.collection('users');

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
        user: firebase.auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null,
        username: '',
        usersInfo: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        // Queries the databae and returns the data
        usersRef
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          this.setState({ usersInfo: data });
        });
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
            uid: this.state.user.uid,
          });
          this.setState({ content: '' });
        } catch (error) {
          this.setState({ writeError: error.message });
        }
    }

    formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getHours()}:${d.getMinutes()}`;
    return time;
    }
 
    render() {
      
      return (
          <div>
            <Header/>
            <div className="content">
              <div className="w-100 px-3">
              <h1 className="h3 mb-3">Messages</h1>
              <div className="card mw-100">
                <div className="row g-0">
                  <div className="col-12 col-lg-5 col-xl-3 border-right">
                    <div className="px-4 d-none d-md-block">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <input type="text" className="form-control my-3 w-100" placeholder="Search..." />
                        </div>
                      </div>
                    </div>
                    <div className="position-relative profile-scroll">
                    {this.state.usersInfo.map(userInfo => {
                        return (
                          <a className="list-group-item list-group-item-action border-0">
                            <div className="d-flex align-items-start">
                              <img src={userInfo.photoURL} className="profile-photo"/>
                                <div className="d-flex flex-column">
                                  <span className="pl-2">{userInfo.username}</span>
                                  <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                                </div>
                            </div>
                        </a>
                        )
                      })
                    }
                 

                    </div>

                    <hr className="d-block d-lg-none mt-1 mb-0" />
                  </div>
                  <div className="col-12 col-lg-7 col-xl-9">
                    <div className="py-2 px-4 border-bottom d-none d-lg-block">
                      <div className="d-flex align-items-center py-1">
                        <div className="position-relative">
                          <img src={this.state.user.photoURL} className="rounded-circle mr-1" width="40" height="40" />
                        </div>
                        <div className="flex-grow-1 pl-3">
                          <strong></strong>
                        </div>
                      </div>
                    </div>
                    <div className="position-relative">
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
                        <div style={{ float:"left", clear: "both" }}
                          ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                      </div>
                    </div>
                    <form onSubmit={this.handleSubmit} className="d-flex p-3">
                        <input onChange={this.handleChange} value={this.state.content}  className="form-control w-100" id="messageInput"></input>
                        {this.state.error ? <p>{this.state.writeError}</p> : null}
                        <button type="submit" className="btn btn-primary chat-btn"><i className="fas fa-angle-double-right"></i></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      );
  }
}