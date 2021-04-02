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

        <Footer/>
      </div>
    )
  }
}