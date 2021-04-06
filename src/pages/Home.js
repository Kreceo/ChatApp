import React, { Component } from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';

export default class HomePage extends Component {
  render() {
    return (
      <div className="auth" style={{ backgroundImage: "url(https://kreceo.sfo2.digitaloceanspaces.com/ChatApp/ChatApp/bg-test.jpg)" }}>
        <section className="auth__container">
          <div className="auth__card">
            <img src='https://kreceo.sfo2.digitaloceanspaces.com/ChatApp/ChatApp/message-bubble.jpg' alt=""/>
            <h5>Connect Together</h5>
            <p>Chit Chat to your heart content!</p>
            <div className="auth__links">
              <Link to="/signup"><PrimaryButton title="Get Started"/></Link>
              <Link to="/login">Log in</Link>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    )
  }
}