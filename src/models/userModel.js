import db from "../config/db.js";

export const findUserByUserId = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM user WHERE user_id = ?",
    [userId]
  );
  return rows[0];
};

export const createUser = async (userId, hashedPw, userName, userEmail) => {
  const [result] = await db.query(
    `INSERT INTO user (user_id, user_pw, user_name, user_email)
     VALUES (?, ?, ?, ?)`,
    [userId, hashedPw, userName, userEmail]
  );
  return result.insertId;
};
