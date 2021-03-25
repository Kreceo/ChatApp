import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: ""
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
      await signin(this.state.email, this.state.password);
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
      <div className="body-bg" style={{ backgroundImage: "url(/images/bg-test.jpg)" }}>
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
              <button type="submit" className="btn btn-primary mb-2 rounded-btn w-100">Log in</button>
            </div>
            <hr />
            <p>You can also log in with any of these services</p>
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
              Don't have an account? 
              <Link to="/signup"> Sign up</Link>
            </p>
          </form>
          </div>
        </section>
      </div>
    );
  }
}