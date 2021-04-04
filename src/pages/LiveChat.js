import React, { Component } from "react";
import Header from '../components/Header';
import LiveSidebar from '../components/LiveSidebar'
import LiveChatBox from "../components/LiveChatBox";

class LiveChat extends Component {
    render() {
      return (
        <div className="d-flex h-100">
          <LiveSidebar/>
          <div className="d-flex flex-column h-100 w-100">
            <Header/>
            <LiveChatBox/>
          </div>
        </div>
      );
  }
}

export default LiveChat;