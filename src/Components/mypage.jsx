import { useEffect, useState } from "react";
import "../Css/mypage.css";
import Sidebar from "./sidebar";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // 🔹 사용자 정보 가져오기
    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data.user))
      .catch(() => setUserInfo(null));

    // 🔹 최근 프롬프트 로그 가져오기
    fetch("http://localhost:5000/api/prompt/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLogs(data.logs.slice(0, 3))) // 최근 3개만 표시
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mypage-container">
        <Sidebar />
      <div className="mypage-box">
        <h1 className="mypage-title">My Profile</h1>

        {userInfo && (
          <div className="mypage-info">
            <p><strong>ID:</strong> {userInfo.userId}</p>
            <p><strong>Name:</strong> {userInfo.user_name}</p>
            <p><strong>Email:</strong> {userInfo.user_email}</p>
          </div>
        )}

        <h2 className="mypage-subtitle">📌 최근 프롬프트 기록</h2>

        <div className="log-list">
          {logs.length > 0 ? (
            logs.map((log) => (
              <div key={log.log_id} className="log-card">
                <p className="log-input"><strong>Q:</strong> {log.input_data}</p>
                <p className="log-output"><strong>A:</strong> {log.output_data}</p>
                <p className="log-time">{log.input_time.slice(0, 16)}</p>
              </div>
            ))
          ) : (
            <p className="no-log">아직 기록이 없습니다.</p>
          )}
        </div>

        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyPage;
