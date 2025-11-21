import React from "react";
import "../Css/login.css";

const Login = ({ onClose }) => {
  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        

        <h1 className="login-title">Log In</h1>

        <div className="form-group">
          <label>ID*</label>
          <input type="text" placeholder="Enter your ID" />
        </div>

        <div className="form-group">
          <label>Password*</label>
          <div className="password-wrapper">
            <input type="password" placeholder="Enter password" />
          </div>
        </div>

        <button className="login-btn">Log In ➜</button>
        <p className="create-account">Create an account</p>
      </div>
    </div>
  );
};

export default Login;
