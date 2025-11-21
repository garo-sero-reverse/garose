import Sidebar from "./sidebar";
import "../Css/main.css";

const Main = () => {
  return (
    <div className="main-container">
      <Sidebar />

      <div className="chat-wrapper">
        {/* 메시지 박스 */}
        <div className="chat-box">
          <p className="chat-text">안녕하세요! 무엇을 도와드릴까요? 😊</p>
        </div>

        {/* 입력창 */}
        <div className="input-area">
          <input
            type="text"
            placeholder="Enter a prompt here"
            className="chat-input"
          />
          <div className="input-icons">
            <button>📎</button>
            <button>🎤</button>
            <button className="send-btn">➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
