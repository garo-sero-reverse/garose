import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/login.css";

const Login = ({ onClose }) => {
  const [user_id, setUserId] = useState("");
  const [user_pw, setUserPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        user_id,
        user_pw,
      });

      localStorage.setItem("token", response.data.token);

      alert("로그인 성공!");
      onClose(); // 🔹 모달 닫기
      window.location.reload(); // 🔹 로그인 상태 반영
    } catch (error) {
      alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <h1 className="login-title">Log In</h1>

        <div className="form-group">
          <label>ID</label>
          <input type="text" value={user_id} onChange={(e) => setUserId(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" value={user_pw} onChange={(e) => setUserPw(e.target.value)} />
        </div>

        <button className="login-btn" onClick={handleLogin}>Log In ➜</button>
        <p className="create-account" onClick={() => navigate("/signin")}>Create an account</p>
      </div>
    </div>
  );
};

export default Login;
