// import userEvent from '@testing-library/user-event';
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

function Header() {
  return (
    <header className="mb-4 header">
      <nav className="navbar navbar-expand-sm navbar-light bg-white">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to="/dashboard">Dashboard</Link>
              <Link className="nav-item nav-link mr-3" to="/chat">Chat</Link>
              <Link className="nav-item nav-link mr-3" to="/settings">Settings</Link>
              <button className="btn btn-primary mr-1" onClick={() => auth().signOut()}>Logout</button>
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to="/signup">Create account</Link>
              <Link className="nav-item nav-link mr-1" to="/login">Login</Link>
            </div>}
        </div>
      </nav>
    </header>
  );
}

export default Header;