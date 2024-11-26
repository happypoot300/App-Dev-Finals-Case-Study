// React
import React, { useState } from "react";
// CSS style
import Style from "../css modules/LoginPage.module.css";
// React router dom
import { useNavigate, Link } from "react-router-dom";
// Axios
import axios from "../api/axios";
// Bootstrap
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

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

      console.log("userROLE: ", response.data.role);
      console.log("userROLE: ", response.data.role === "admin");

      // Store the token in local storage
      localStorage.setItem("token", token);
      setEmail("");
      setPassword("");
      //need ng checker to see if admin ba yung acc or user lang
      navigate("/ViewProductPage", {
        state: { isUserAdmin: response.data.role === "admin" },
        replace: true,
      });
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }

    setLoading(false); // Stop loading when done
  };

  function handleNavigateRegister() {
    navigate("/RegisterPage", { replace: true });
  }

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
          <Button
            type="submit"
            className="btn btn-primary w-50 mt-2"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </form>
        <Container fluid className="d-flex mt-3 justify-content-center">
          <p>Don't have an account?</p>
          <Button
            variant="link"
            className="p-0 m-0 align-text-top"
            onClick={handleNavigateRegister}
          >
            <p>Register</p>
          </Button>
        </Container>
      </div>
    </div>
  );
}
