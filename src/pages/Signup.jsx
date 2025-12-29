import React, { useState } from "react";
import './Auth.css';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const user = { username, email, password };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", "fake-token-123");

    navigate("/home");
  };

  return (
    <div className="auth-page-wrapper">
      <h1 className="logo-large">echoo</h1>

      <div className="auth-container">
        <h2 className="title">Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#A48465",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "16px",
              color: "#2c0000",
              marginTop: "10px",
              textTransform: "none",
            }}
          >
            Sign up
          </Button>
        </form>

        <p className="switch-text">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;