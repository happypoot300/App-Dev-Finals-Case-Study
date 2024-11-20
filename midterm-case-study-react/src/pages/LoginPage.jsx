// React
import React, { useState } from "react";
// CSS style
import Style from "../css modules/LoginPage.module.css";
// React router dom
import { useNavigate } from "react-router-dom";
// Axios
import axios from "../api/axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To disable button during login attempt
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error message on every attempt
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/login", { email, password });
      const token = response.data.token;
      // Store the token in local storage
      localStorage.setItem("token", token);
      setEmail("");
      setPassword("");
      navigate("/ViewProductPage", { replace: true });
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }

    setLoading(false); // Stop loading when done
  };

  return (
    <div className={Style.loginContainer}>
      <div className={Style.loginForm}>
        <h2 className={Style.header}>Login</h2>
        {error && <p className={Style.textDanger}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label d-flex">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // Reset error when email changes
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label d-flex">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Reset error when password changes
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
