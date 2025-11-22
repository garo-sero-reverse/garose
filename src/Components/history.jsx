import { useEffect, useState } from "react";
import "../Css/history.css";
import Sidebar from "./sidebar";

const History = () => {
  const [logs, setLogs] = useState([]); // ✔ 초기값을 빈 배열로 설정

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/prompt/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.logs) {
          setLogs(data.logs); // 🟢 API에서 logs만 추출
        }
      })
      .catch((err) => console.error("로그 조회 실패:", err));
  }, []);

  return (
    <div className="history-container">
        <Sidebar/>
      <h1 className="history-title">Prompt History</h1>

      {!logs || logs.length === 0 ? (
        <p className="no-log">아직 기록이 없습니다.</p>
      ) : (
        <div className="history-list">
          {logs.map((log) => (
            <div key={log.log_id} className="history-card">
              <p><strong>Q:</strong> {log.input_data}</p>
              <p><strong>A:</strong> {log.output_data}</p>
              <p className="log-time">{log.input_time.slice(0, 16)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
