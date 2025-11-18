import "../Css/sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">

            {/* 로고 */}
            <div className="top-section">
                <img src="/images/logo.png" className="logo-icon" />
            </div>

            {/* 메뉴 */}
            <ul className="menu">
                <li className="menu-item">
                    <img src="/images/Chat.png" className="icon"/>
                    <span className="text">Chat</span>
                </li>

                <li className="menu-item">
                    <img src="/images/History.png" className="icon"/>
                    <span className="text">Chat History</span>
                </li>

                <li className="menu-item">
                    <img src="/images/settings.png" className="icon"/>
                    <span className="text">Services</span>
                </li>
            </ul>

            {/* 하단 */}
            <div className="bottom-section">
                <div className="bottom-item">
                    <img src="/images/User.png" className="icon"/>
                    <span className="text">Profile</span>
                </div>

                <div className="bottom-item plan-item">
                    <img src="/images/Plan.png" className="icon"/>
                    <span className="text">Plan</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
