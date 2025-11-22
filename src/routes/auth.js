import express from "express";
import { register, login } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// 🛡️ 로그인된 사용자만 접근 가능
router.get("/me", verifyToken, async (req, res) => {
  res.json({
    message: "인증 성공",
    user: req.user
  });
});

export default router;
