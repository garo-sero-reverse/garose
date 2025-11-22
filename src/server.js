import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import promptRoutes from "./routes/prompt.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 헬스체크
app.get("/", (req, res) => {
  res.send("Backend is running 😎");
});

app.use("/api/prompt", promptRoutes);

// 인증 관련 라우트
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
