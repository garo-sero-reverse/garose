import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import "../Css/sidebar.css";

const Sidebar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false); // 🔥 서브 메뉴
  const [isHovered, setIsHovered] = useState(false);     // 🔥 hover 상태
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const requireLogin = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return false;
    }
    return true;
  };

  return (
    <div
      className="sidebar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setServiceOpen(false);
      }}
    >
      {/* Logo */}
      <div className="top-section" onClick={() => navigate("/")}>
        <img src="/images/logo.png" className="logo-icon" alt="logo" />
      </div>

      {/* Main Menu */}
      <ul className="menu">
        <li
          className="menu-item"
          onClick={() => {
            if (!requireLogin()) return;
            navigate("/");
          }}
        >
          <img src="/images/Chat.png" className="icon" />
          <span className="text">Chat</span>
        </li>

        <li
          className="menu-item"
          onClick={() => {
            if (!requireLogin()) return;
            navigate("/history");
          }}
        >
          <img src="/images/History.png" className="icon" />
          <span className="text">History</span>
        </li>

        {/* Services (로그인 없이 사용 가능) */}
        <li
          className="menu-item service-item"
          onClick={() => setServiceOpen(!serviceOpen)}
        >
          <img src="/images/settings.png" className="icon" />
          <span className="text">Services</span>
        </li>

        {/* 🔥 서브 메뉴 복구됨 */}
        {isHovered && serviceOpen && (
          <ul className="submenu">
            <li onClick={() => navigate("/use")}>How to Use?</li>
            <li onClick={() => navigate("/what")}>What is Prompt Injection?</li>
          </ul>
        )}
      </ul>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div
          className="bottom-item"
          onClick={() => {
            if (!requireLogin()) return;
            navigate("/mypage");
          }}
        >
          <img src="/images/User.png" className="icon" />
          <span className="text">Profile</span>
        </div>

        <div
          className="bottom-item plan-item"
          onClick={() => {
            if (!requireLogin()) return;
            navigate("/plan");
          }}
        >
          <img src="/images/Plan.png" className="icon" />
          <span className="text">Plan</span>
        </div>
      </div>

      {/* 로그인 모달 */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
};

export default Sidebar;
