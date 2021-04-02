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
          <div className="settings__container">
          <h2>Profile Information</h2>
          <h4>Update / add your information below:</h4>
          <hr/>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="card h-100 mw-100 border-shadow">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img src={this.state.user.photoURL} alt="Admin" className="rounded-circle" width="150" />
                      <div className="mt-3">
                        <h4>{this.state.user.displayName}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card mb-3 mw-100">
                <form onSubmit={this.handleSubmit} className="border-shadow">
                  <div className="card-body">
                    <div className="align-items-center">
                      <h6 className="pt-2">Full Name</h6>
                      <input
                        type="text"
                        className="form-control w-100"
                        name="name"
                        defaultValue={this.state.user.displayName}
                        onChange={this.handleChange}
                        ref={(input) => this.input = input}
                      />
                    </div>
                    <hr/>
                    <div className="align-items-center">
                      <h6 className="pt-2">Username</h6>
                      <input
                        type="text"
                        className="form-control w-100"
                        name="username"
                        defaultValue={this.state.user.displayName}
                        onChange={this.handleChange}
                      />
                    </div>
                    <h3>{this.state.username}</h3>
                    <hr/>
                    <div className="align-items-center">
                      <h6 className="pt-2">Email</h6>
                      <input
                        type="email"
                        className="form-control w-100"
                        name="email"
                        defaultValue={this.state.user.email}
                        onChange={this.handleChange}
                        ref={(input) => this.input = input}
                      />
                    </div>
                    <h3>{this.state.email}</h3>
                  </div>
                  <div className="card-body">
                    <button type="submit" className="btn btn-primary">Update details</button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    )
  }
}