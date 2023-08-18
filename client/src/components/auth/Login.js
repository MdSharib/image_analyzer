import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email.trim() === "" || password.trim() === ""){
      setError(true);
      return;
    }
    const details = JSON.parse(sessionStorage.getItem("user"));

    if(!details){
      navigate("/unauthorized");
      return;
    }

    if(details["email"] !== email || details["password"] !== password){
      setError(true);
      return;
    }
    const access = {
      ...details,
      isVerified: true,
    }
    sessionStorage.setItem("user", JSON.stringify(access));
    setError(false);
    navigate("/home");
  };
  return (
    <div className={styles["div-styling"]}>
      <form onSubmit={handleSubmit} className={styles["form-styling"]}>
        <h5 className={styles.heading}>Login into your account</h5>
        <div className={styles.inner}>
          <div className={styles["input-div"]}>
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className={styles.input}
              required
            />
          
          </div>
          <div className={styles["input-div"]}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className={styles.input}
              required
            />
           
          </div>
          <div>
            <button type="submit" className={styles.loginBtn}>
              Login
            </button>
          </div>
          {error && <p className={styles.error}>Invalid Credentials!</p>}
          <button
            type="button"
            className={styles.btn}
            onClick={() => {
              navigate("/register");
            }}
          >
            Don't have an account?Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
