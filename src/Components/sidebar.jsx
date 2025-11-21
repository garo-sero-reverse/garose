import { useState } from "react";
import "../Css/sidebar.css";
import { useNavigate } from "react-router-dom";
import Login from "./login";

const Sidebar = () => {
    const [serviceOpen, setServiceOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="sidebar"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setServiceOpen(false);
                }}
            >
                {/* 로고 */}
                <div className="top-section" onClick={() => navigate("/")}>
                    <img src="/images/logo.png" className="logo-icon" />
                </div>

                {/* 메뉴 */}
                <ul className="menu">
                    <li className="menu-item" onClick={() => navigate("/")}>
                        <img src="/images/Chat.png" className="icon" />
                        <span className="text">Chat</span>
                    </li>

                    <li className="menu-item">
                        <img src="/images/History.png" className="icon" />
                        <span className="text">Chat History</span>
                    </li>

                    <li className="menu-item service-item" onClick={() => setServiceOpen(!serviceOpen)}>
                        <img src="/images/settings.png" className="icon" />
                        <span className="text">Services</span>
                    </li>

                    {/* 서브메뉴 */}
                    {isHovered && serviceOpen && (
                        <ul className="submenu">
                            <li onClick={() => navigate("/use")}>How to use?</li>
                            <li onClick={() => navigate("/what")}>What is Prompt Injection?</li>
                        </ul>
                    )}
                </ul>

                {/* 하단 */}
                <div className="bottom-section">
                    <div className="bottom-item" onClick={() => setShowLogin(true)}>
                        <img src="/images/User.png" className="icon" />
                        <span className="text">Profile</span>
                    </div>

                    <div className="bottom-item plan-item">
                        <img src="/images/Plan.png" className="icon" />
                        <span className="text">Plan</span>
                    </div>
                </div>
            </div>

            {/*로그인 모달*/}
            {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </>
    );
};

export default Sidebar;
