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
        writeError: null,
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
    const time = `${d.getHours()}:${d.getMinutes()}`;
    return time;
    }
    // ${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} 

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

					<a href="#" className="list-group-item list-group-item-action border-0">
						<div className="badge bg-success float-right">5</div>
						<div className="d-flex align-items-start">
							<img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40"/>
							<div className="flex-grow-1 ml-3">
								Vanessa Tucker
								<div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
							</div>
						</div>
					</a>
					<hr className="d-block d-lg-none mt-1 mb-0" />
				</div>
				<div className="col-12 col-lg-7 col-xl-9">
					<div className="py-2 px-4 border-bottom d-none d-lg-block">
						<div className="d-flex align-items-center py-1">
							<div className="position-relative">
								<img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
							</div>
							<div className="flex-grow-1 pl-3">
								<strong>Sharon Lessman</strong>
								<div className="text-muted small"><em>Typing...</em></div>
							</div>
							<div>
								<button className="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
								<button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
								<button className="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
							</div>
						</div>
					</div>
					<div className="position-relative">
						<div className="chat-messages px-4 py-2">
            {this.state.chats.map(chat => {
               return <div className={"mb-4 chat-message-" + (this.state.user.uid === chat.uid ? "right" : "left")}><p key={chat.timestamp}></p>
								<div>
									<img src={this.state.user.photoURL} className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
									<div className="text-muted small text-nowrap mt-2">{this.formatTime(chat.timestamp)}</div>
								</div>
								<div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div className="font-weight-bold mb-1">You</div>
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
              <input onChange={this.handleChange} value={this.state.content} className="form-control w-100" id="messageInput"></input>
              {this.state.error ? <p>{this.state.writeError}</p> : null}
              <button type="submit" className="btn btn-primary chat-btn"><i className="fas fa-angle-double-right"></i></button>
          </form>
				</div>
			</div>
		</div>
	</div>
</div>
            {/* Chat box
            <div className="d-flex flex-column chat-area" id="scroller">
              {this.state.chats.map(chat => {
                return <div className={"chat-bubble my-1 " + (this.state.user.uid === chat.uid ? "current-user" : "friend")}><p key={chat.timestamp}>
                {chat.content}
                <br/>
                <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
                </p>
                </div> 
              })}
              <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
              </div>
            </div> */}
          
            {/* Input message section */}
            
            <Footer/>
          </div>
        );
    }
}