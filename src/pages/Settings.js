import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { auth } from "../services/firebase";
import PrimaryButton from '../components/PrimaryButton';

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
      <>
        <Header/>
        <section className="settings">

          <h2>Profile Information</h2>
          <h4>Update / add your information below:</h4>
          <hr/>

          <div className="settings__container">
            <div className="settings__card">
                <div className="settings__profile">
                  <img src={this.state.user.photoURL}/>
                  <h4>{this.state.user.displayName}</h4>
                  <p>This will be a bio at some point. So for now, here is some random text.</p>
                </div>
            </div>
        
            <div className="settings__card">
              <div className="settings__form">
                <form onSubmit={this.handleSubmit}>
                  <h6 className="pt-2">Full Name</h6>
                  <input type="text" className="form-control" name="name" defaultValue={this.state.user.displayName} onChange={this.handleChange} ref={(input) => this.input = input} />
                  <hr/>
                  <h6 className="pt-2">Username</h6>
                  <input type="text" className="form-control" name="username" defaultValue={this.state.user.displayName} onChange={this.handleChange} />                 
                  <h3>{this.state.username}</h3>
                  <hr/>
                  <h6 className="pt-2">Email</h6>
                  <input type="email" className="form-control w-100" name="email" defaultValue={this.state.user.email} onChange={this.handleChange} ref={(input) => this.input = input} />
                  <h3>{this.state.email}</h3>
                  <PrimaryButton type="submit" title="Update details"/>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </>
    )
  }
}