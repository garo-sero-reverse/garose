# 🛡️ Garo-Sero Reverse  
### AI-based Prompt Injection Detection Service

**Garo-Sero Reverse**는  
LLM(대규모 언어 모델) 기반 서비스에서 발생하는  
**Prompt Injection 공격을 탐지하기 위한 AI 보안 시스템**입니다.

사용자가 입력한 프롬프트를 분석하여  
**정상 요청인지, 공격 시도인지**를 AI 모델이 자동으로 판별합니다.

---

## 🔍 What is Prompt Injection?

Prompt Injection은  
LLM의 시스템 지시를 무력화하거나 보안 정책을 우회하도록 유도하는 공격 기법입니다.

- 시스템 명령 무시 유도  
- 제한된 응답 정책 우회  
- 내부 정보 노출 시도  
- 의도하지 않은 행동 강제  

기존 키워드·룰 기반 필터로는 탐지가 어렵기 때문에  
**의미 기반 AI 탐지 방식**이 필요합니다.

---

## ⚙️ How It Works

- **Input**: User Prompt  
- **AI Model**: XLM-RoBERTa (Large)  
- **Output**:
  - `Normal` — 정상 프롬프트  
  - `Attack` — Prompt Injection 의심  

다국어 환경에서도 동작하도록 설계되어  
영어·비영어 프롬프트 모두 분석할 수 있습니다.

---

## 🧠 AI Model Overview

- **Model**: XLM-RoBERTa Large  
- **Task**: Binary Text Classification  
- **Training**: Fine-tuning 기반 Downstream Task 학습  
- **Focus**: 공격 탐지 Recall 극대화  

---

## ⚙️ Training Pipeline

1. Prompt Injection 데이터셋 로드  
2. 입력 프롬프트 전처리 및 토크나이징  
3. XLM-RoBERTa 기반 Fine-tuning  
4. Epoch 단위 성능 평가  
5. Best Model 저장 및 로그 기록  

---

## 📊 Evaluation Metrics

모델 평가는 단순 Accuracy가 아닌  
**보안 관점에 적합한 지표**를 사용합니다.

- Accuracy  
- Precision  
- **Recall ⭐ (공격 탐지에서 가장 중요)**  
- F1-score  
- Confusion Matrix  

> 공격을 놓치지 않는 것(False Negative 최소화)을  
> 최우선 목표로 합니다.

---

## 🚀 Training

아래 명령어로 AI 모델 학습을 실행할 수 있습니다.

```bash
python test/train_test.py


## 🔒 Notes

- 모델 가중치, 캐시, 실험 로그 파일은 Git에 포함되지 않습니다.
- 본 프로젝트는 **연구 및 서비스 확장을 위한 AI 베이스라인**입니다.
- 실제 서비스 적용 시 추가 검증 및 threshold 조정이 필요합니다.
- Prompt Injection 탐지는 확률 기반 판단이므로 오탐(False Positive)이 발생할 수 있습니다.

---

## 🔮 Future Improvements

- Prompt Injection 강도(Degree) 기반 다중 클래스 분류 확장
- 다중 Prompt Injection 데이터셋 통합 학습
- 실시간 API 형태의 서비스 제공
- LLM 서비스 앞단 자동 보안 필터링 시스템 구축
- False Negative 최소화를 위한 Loss Function 개선

---

## 🧩 Summary

> **Garo-Sero Reverse는  
> LLM을 속이려는 프롬프트를 AI로 사전에 탐지하여  
> 서비스의 안전성과 신뢰성을 강화하는 것을 목표로 합니다.**

---

## 🔑 One-line Summary

> **“LLM을 속이려는 프롬프트를, AI가 먼저 걸러냅니다.”**
