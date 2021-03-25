import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { auth } from "../services/firebase";

export default class HomePage extends Component {

  constructor(props) {
      super(props);
      this.state = {
      user: auth().currentUser,
      displayName: '',
      email: '',        
      photoURL: ''
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    
    alert('Your username is: ' + this.input.value);
    
  };

  render() {
    return (
      <div className="d-flex h-100">
        <Header/>
        <section className="d-flex full-height justify-content-center align-items-center width90 m-auto">
        <form onSubmit={this.handleSubmit}>
          <h2>Profile Information</h2>
          <h4>Update / add your information below:</h4>
          <div className="mb-3">
          <div>
            <img src={this.state.user.photoURL} className="rounded-circle"/>
          </div>
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              defaultValue={this.state.user.displayName}
              onChange={this.handleChange}
            />
          </div>
          <h3>{this.state.username}</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              defaultValue={this.state.user.email}
              onChange={this.handleChange}
              ref={(input) => this.input = input}
            />
          </div>
          <h3>{this.state.email}</h3>
          <button type="submit" className="btn btn-primary">Update details</button>
        </form>
        </section>
        <Footer/>
      </div>
    )
  }
}