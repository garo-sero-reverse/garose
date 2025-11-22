import { useState } from "react";
import axios from "axios";
import "../Css/signin.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";

const SignIn = () => {
  const [user_name, setFullname] = useState("");
  const [user_id, setUserId] = useState("");
  const [user_pw, setUserPw] = useState("");
  const [user_email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        user_name,
        user_id,
        user_pw,
        user_email,
      });

      alert("회원가입 완료! 로그인 해주세요 😊");
      navigate("/"); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      if (error.response?.status === 409) {
        alert("이미 존재하는 ID 또는 이메일입니다!");
      } else {
        alert("회원가입 실패! 입력 정보를 다시 확인해주세요.");
      }
    }
  };

  return (
    <div className="signin-container">
      <Sidebar />
      <div className="signin-box">

        <h1 className="signin-title">Sign In</h1>

        <form onSubmit={handleSignUp} className="signin-form">

          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={user_name}
            onChange={(e) => setFullname(e.target.value)}
            required
          />

          <label>ID</label>
          <input
            type="text"
            placeholder="Enter your ID"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={user_pw}
            onChange={(e) => setUserPw(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={user_email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="signin-btn">Sign In ➜</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
