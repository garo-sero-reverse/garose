import db from "../config/db.js";

export const savePromptLog = async (req, res) => {
  const { input_data, output_data } = req.body;
  const user_id = req.user.id;  // ⭐ JWT에서 가져온 사용자 ID

  if (!input_data) {
    return res.status(400).json({ message: "input_data는 필수입니다." });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO prompt_log (user_id, input_data, output_data) 
       VALUES (?, ?, ?)`,
      [user_id, input_data, output_data || null]
    );

    res.status(201).json({
      message: "프롬프트 로그 저장 완료",
      log_id: result.insertId,
    });
  } catch (err) {
    console.error("프롬프트 저장 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
};

export const getMyPromptLogs = async (req, res) => {
  const user_id = req.user.id; // JWT에서 user_id 추출

  try {
    const [rows] = await db.query(
      `SELECT log_id, input_data, output_data, input_time 
       FROM prompt_log 
       WHERE user_id = ? 
       ORDER BY input_time DESC`,
      [user_id]
    );

    res.status(200).json({ logs: rows });
  } catch (err) {
    console.error("프롬프트 조회 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
};
