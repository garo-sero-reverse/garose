import express from "express";
import { savePromptLog, getMyPromptLogs } from "../controllers/promptController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ⭐ 로그인된 사용자만 프롬프트 기록 가능
router.post("/save", verifyToken, savePromptLog);
router.get("/my", verifyToken, getMyPromptLogs);


router.post("/save", verifyToken, savePromptLog);
router.get("/my", verifyToken, getMyPromptLogs);

export default router;
