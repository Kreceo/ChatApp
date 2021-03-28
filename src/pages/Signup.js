import React, { Component } from 'react';
import firebase from "firebase/app";
import { Link } from 'react-router-dom';
import { signInWithGoogle, signInWithGitHub } from '../helpers/auth';
// import { auth, firestore } from "../services/firebase";


// function signup(email, password) {
//   return auth().createUserWithEmailAndPassword(email, password)
//   .then((userCredentials)=>{
//     if(userCredentials.user){
//       userCredentials.user.updateProfile({
//         // Update this, and then put it into a function on profile page
//         // By default, it will use the name form the email address
//         displayName: userCredentials.user.email.split("@")[0],
//         // By default, it will add a simple image
//         photoURL: "https://kreceo.sfo2.digitaloceanspaces.com/ChatApp/ChatApp/default-profile-image.jpg",
//       })
//     }
// })
// };

const usersRef = firebase
.firestore()
.collection('users');

function signup(email, password) {
firebase
  .auth().createUserWithEmailAndPassword(email, password)
  // if(userCredentials.user){
  //   userCredentials.user.updateProfile({
  //     // Update this, and then put it into a function on profile page
  //     // By default, it will use the name form the email address
  //     displayName: userCredentials.user.email.split("@")[0],
  //     // By default, it will add a simple image
  //     photoURL: "https://kreceo.sfo2.digitaloceanspaces.com/ChatApp/ChatApp/default-profile-image.jpg",
  //   })
  // }
  .then(function(userCredentials) {
    usersRef
      .doc(`${userCredentials.user.uid}`)
      .set({
        // Set these up at a later date
        // firstName: values.firstName,
        // lastName: values.lastName,
        username: userCredentials.user.email.split("@")[0],
        uid: userCredentials.user.uid,
        photoURL: "https://kreceo.sfo2.digitaloceanspaces.com/ChatApp/ChatApp/default-profile-image.jpg",
      })
    })
}

export default class SignUp extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
    }

    handleChange(event) {
        this.setState({
        [event.target.name]: event.target.value
        });
    }

    

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
        await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    async googleSignIn() {
        try {
          await signInWithGoogle();
        } catch (error) {
          this.setState({ error: error.message });
        }
      }

      async githubSignIn() {
        try {
          await signInWithGitHub();
        } catch (error) {
          this.setState({ error: error.message });
        }
      }

  render() {
    return (
      <div className="body-bg" style={{ backgroundImage: "url(https://kreceo.sfo2.digitaloceanspaces.com/ChatApp/ChatApp/bg-test.jpg)" }}>
      <section className="d-flex full-height justify-content-center align-items-center width90 m-auto">
        <div className="p-4 shadow p-3 mb-5 bg-white rounded">
         <form autoComplete="off" onSubmit={this.handleSubmit}>
          <p>Fill in the form below to create your account.</p>
          <div className="mb-3">
            <input placeholder="Email Address" name="email" type="email" className="form-control w-100" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div className="mb-3">
            <input placeholder="Password" name="password" className="form-control w-100" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div>
            {this.state.error ? (
              <p>{this.state.error}</p>
            ) : null}
            <button type="submit" className="btn btn-primary mb-2 rounded-btn w-100">Create account</button>
          </div>
          <hr />
          <p>You can also sign up with any of these services</p>
          <div className="d-flex justify-content-around">
            <button className="btn btn-info mb-2 btn-circle" type="button" onClick={this.googleSignIn}>
              <i className="fab fa-google"></i>
            </button>
            <button className="btn btn-secondary mb-2 btn-circle " type="button" onClick={this.githubSignIn}>
              <i className="fab fa-github"></i>
            </button>
          </div>
          <hr />
          <p>
              Already registered? 
            <Link to="/login"> Login</Link>
          </p>
        </form>
        </div>
      </section>
      </div>
    )
  }
}