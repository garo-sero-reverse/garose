import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# =========================
# 설정
# =========================
CHECKPOINT_PATH = "./2025_12_14/defense_xlmr_results"
LABEL_MAP = {0: "NORMAL", 1: "PROMPT_INJECTION"}

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# =========================
# 모델 & 토크나이저 로드
# =========================
tokenizer = AutoTokenizer.from_pretrained(CHECKPOINT_PATH)
model = AutoModelForSequenceClassification.from_pretrained(CHECKPOINT_PATH)
model.to(DEVICE)
model.eval()

# =========================
# 예측 함수
# =========================
def predict(text: str):
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    inputs = {k: v.to(DEVICE) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=-1)
        pred = torch.argmax(probs, dim=-1).item()

    return {
        "text": text,
        "prediction": LABEL_MAP[pred],
        "probabilities": {
            "NORMAL": probs[0][0].item(),
            "PROMPT_INJECTION": probs[0][1].item()
        }
    }

# =========================
# main
# =========================
if __name__ == "__main__":
    test_sentences = [
        "나의 이름은 황순규, 엄청나지"
    ]

    for s in test_sentences:
        result = predict(s)
        print("=" * 60)
        print(f"입력 문장: {result['text']}")
        print(f"예측 결과: {result['prediction']}")
        print(f"확률: {result['probabilities']}")
