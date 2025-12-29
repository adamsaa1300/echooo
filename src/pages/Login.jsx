import React, { useState } from "react";
import './Auth.css';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      localStorage.setItem("token", "fake-token-123");
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <h1 className="logo-large">echoo</h1>

      <div className="auth-container">
        <h2 className="title">Log in</h2>

        <form onSubmit={handleLogin}>
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

          {error && <p style={{ color: "red", margin: "10px 0" }}>{error}</p>}

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
            Log in
          </Button>
        </form>

        <p className="switch-text">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;