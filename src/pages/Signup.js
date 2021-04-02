import React, { Component } from 'react';
import firebase from "firebase/app";
import { Link } from 'react-router-dom';
import { signInWithGitHub } from '../helpers/auth';
// import { auth, firestore } from "../services/firebase";
import PrimaryButton from '../components/PrimaryButton';
import { auth } from "../services/firebase";


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

function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider)
  .then(function(userCredentials) {
    usersRef
      .doc(`${userCredentials.user.uid}`)
      .set({
        // Set these up at a later date
        // firstName: values.firstName,
        // lastName: values.lastName,
        username: userCredentials.user.email.split("@")[0],
        uid: userCredentials.user.uid,
        photoURL: userCredentials.user.photoURL,
      })
    })
}

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
      this.setState({ error: "" });
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
      <div className="auth" style={{ backgroundImage: "url(https://kreceo.sfo2.digitaloceanspaces.com/ChatApp/ChatApp/bg-test.jpg)" }}>
        <section className="auth__container">
          <div className="auth__card auth__card--large">
          <form autoComplete="off" onSubmit={this.handleSubmit}>

            <p>Fill in the form below to create your account.</p>

            <div className="auth__form">
              <input placeholder="Email Address" name="email" type="email" className="form-control" onChange={this.handleChange} value={this.state.email} />
              <input placeholder="Password" name="password" className="form-control" onChange={this.handleChange} value={this.state.password} type="password" />
              <PrimaryButton title="Create account" type="submit"/>
            </div>

            <hr />

            <p>Or signup with your social account:</p>

            <div className="auth__social">
              <button className="auth__social--google" type="button" onClick={this.googleSignIn}>
                <i className="fab fa-google"></i>
              </button>

              <button className="auth__social--facebook" type="button" onClick={this.googleSignIn}>
                <i class="fab fa-facebook"></i>
              </button>

              
              <button className="auth__social--github" type="button" onClick={this.githubSignIn}>
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