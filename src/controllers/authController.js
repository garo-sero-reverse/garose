import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByUserId, createUser } from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { user_id, user_pw, user_name, user_email } = req.body;

  // 1) 필수값 확인
  if (!user_id || !user_pw || !user_name || !user_email) {
    return res.status(400).json({ message: "모든 필드를 입력하세요." });
  }

  // 2) 중복 확인
  const [existingUser] = await db.query(
    "SELECT * FROM user WHERE user_id = ? OR user_email = ?",
    [user_id, user_email]
  );
  if (existingUser.length > 0) {
    return res.status(409).json({ message: "이미 존재하는 ID 또는 이메일입니다." });
  }

  // 3) 암호화 & 저장
  const hashedPw = await bcrypt.hash(user_pw, 10);
  await db.query(
    "INSERT INTO user (user_id, user_pw, user_name, user_email) VALUES (?, ?, ?, ?)",
    [user_id, hashedPw, user_name, user_email]
  );

  res.status(201).json({ message: "회원가입 성공!" });
};

export const login = async (req, res) => {
  try {
    const { user_id, user_pw } = req.body;

    const user = await findUserByUserId(user_id);
    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 ID입니다." });
    }

    const isMatch = await bcrypt.compare(user_pw, user.user_pw);
    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign(
      { id: user.id, userId: user.user_id },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({ message: "로그인 성공", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  }
};

