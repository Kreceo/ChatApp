import React, { Component } from "react";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar'
import ChatBox from "../components/ChatBox";

class Chat extends Component {
    render() {
      return (
        <div className="d-flex h-100">
          <Sidebar/>
          <div className="d-flex flex-column h-100 w-100">
            <Header/>
            <ChatBox/>
          </div>
        </div>
      );
  }
}

export default Chat;