import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'; 
import heroImg from '../echoo.jpg'; 

function Landing() {
  return (
    <div className="landing-page">
      {
      }
      <header className="navbar">
        <nav>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/signup" className="nav-btn">Sign Up</Link>
        </nav>
      </header>

      {
        }
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-content">
          <h1>Welcome to echoo</h1>
          <p>Your minimalist space for thoughts and chats.</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
