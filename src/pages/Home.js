import React, { Component } from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div className="body-bg" style={{ backgroundImage: "url(https://kreceo.sfo2.digitaloceanspaces.com/ChatApp/ChatApp/bg-test.jpg)" }}>
        <section className="d-flex full-height justify-content-center align-items-center width90 m-auto align-items">
          <div className="card w-100">
            <img src='https://kreceo.sfo2.digitaloceanspaces.com/ChatApp/ChatApp/message-bubble.jpg' alt="Man holding Phone" className="rounded"/>
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">Connect Together</h5>
              <p className="card-text">Chit Chat to your heart content!</p>
              <Link to="/SignUp" className="btn btn-primary rounded-btn p-3 w-100">Get Started</Link>
              <Link to="/login" className="p-3">Log in</Link>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    )
  }
}