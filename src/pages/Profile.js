import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { auth } from "../services/firebase";

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        user: auth().currentUser,
    };
    }
  render() {
    return (
      <div className="home">
        <Header/>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">Welcome back {this.state.user.email}</h1>
              <p className="lead">Please make sure to chit chat with friends</p>
              <div className="mt-4">
                <Link className="btn btn-primary px-5 mr-3" to="/chat">Messages</Link>
                <Link className="btn px-5 btn-secondary" to="/friends">Friends</Link>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    )
  }
}