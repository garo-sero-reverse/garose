import { useState, useRef, useEffect } from "react";
import Sidebar from "./sidebar";
import Login from "./login";
import "../Css/main.css";

const Main = () => {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token"); 
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);  // 로그인 안 되어 있으면 모달 열기
      return;
    }

    if (!input.trim()) return;

    const newMessage = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // (AI 응답 테스트용)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `AI 응답 예시: "${input}"에 대한 답변입니다.`,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 700);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="main-wrapper">
      <Sidebar />

      {/* 로그인 모달 */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}

      {/* 채팅 내용 영역 */}
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "ai"}`}
          >
            <div className="message-text">{msg.text}</div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 입력창 */}
      <div className="chat-input-wrapper">
        <input
          type="text"
          placeholder="Type your message..."
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-btn" onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default Main;
