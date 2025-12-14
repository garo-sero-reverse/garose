import torch
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# =========================
# 설정
# =========================
MODEL_PATH = "2025_12_14/defense_xlmr_results/checkpoint-464"  
# 또는 checkpoint 쓰고 싶으면:
# MODEL_PATH = "./defense_xlmr_results/checkpoint-464"

LABEL_MAP = {0: "NORMAL", 1: "PROMPT_INJECTION"}
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# =========================
# 모델 로드 (서버 시작 시 1회)
# =========================
tokenizer = AutoTokenizer.from_pretrained(
    MODEL_PATH,
    fix_mistral_regex=True
)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

# =========================
# FastAPI 앱
# =========================
app = FastAPI(
    title="Prompt Injection Detection API",
    description="XLM-RoBERTa based prompt injection classifier",
    version="1.0.0"
)

# =========================
# Request / Response Schema
# =========================
class PredictRequest(BaseModel):
    texts: List[str]

class PredictResult(BaseModel):
    text: str
    prediction: str
    prob_normal: float
    prob_prompt_injection: float

class PredictResponse(BaseModel):
    results: List[PredictResult]

# =========================
# 예측 함수
# =========================
def predict_batch(texts: List[str]) -> List[PredictResult]:
    inputs = tokenizer(
        texts,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )
    inputs = {k: v.to(DEVICE) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=-1)

    results = []
    for text, prob in zip(texts, probs):
        pred_idx = torch.argmax(prob).item()
        results.append(
            PredictResult(
                text=text,
                prediction=LABEL_MAP[pred_idx],
                prob_normal=prob[0].item(),
                prob_prompt_injection=prob[1].item()
            )
        )
    return results

# =========================
# API Endpoint
# =========================
@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    results = predict_batch(req.texts)
    return {"results": results}

# =========================
# Health Check
# =========================
@app.get("/")
def health():
    return {"status": "ok", "model": MODEL_PATH}
