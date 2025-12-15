🛡️ Garo-Sero Reverse

AI-based Prompt Injection Detection System

다국어 LLM 환경에서 발생하는 Prompt Injection 공격을 탐지하기 위한
XLM-R 기반 텍스트 분류 AI 서버 및 실험 레포지토리

📌 Project Overview

본 프로젝트는 LLM 기반 서비스에서 발생할 수 있는 Prompt Injection 공격을 자동으로 탐지하기 위한
AI 모델 학습 및 실험을 목적으로 한다.

다국어 입력을 처리할 수 있는 XLM-RoBERTa 모델을 사용

Prompt Injection 여부를 이진 분류(Binary Classification) 문제로 정의

Hugging Face Trainer + wandb 기반 실험 추적

실제 서비스 적용을 고려한 재현 가능하고 확장 가능한 구조를 지향

🎯 Objectives

Prompt Injection 공격 탐지를 위한 베이스라인 모델 구축

다양한 공개 데이터셋을 활용한 일반화 성능 검증

공격 탐지에서 중요한 Recall / F1-score 중심 평가

향후 AI 서버(FastAPI 등) 연계를 고려한 구조 설계

🧠 Model & Approach
Model

XLM-RoBERTa Large

다국어 환경에 강건

영어/비영어 Prompt Injection 모두 대응 가능

Task Definition

Input: User Prompt

Output: Prompt Injection 여부 (0: Normal / 1: Attack)

Training Strategy

Fine-tuning 기반 Downstream Task 학습

Early stopping 및 epoch 단위 평가

GPU(CUDA) 기반 학습 지원

📂 Dataset

본 프로젝트에서는 공개 Prompt Injection 데이터셋을 사용한다.

Example Dataset Structure
['System Prompt', 'User Prompt', 'Prompt injection', 'Degree', 'Source']

Usage in This Project

Input: User Prompt

Label: Prompt injection (binary)

데이터셋은 학습 단계에서 다음과 같이 정규화하여 사용한다:

User Prompt → text

Prompt injection → label

📊 Evaluation Metrics

모델 평가는 단순 Accuracy가 아닌 보안 관점에 적합한 지표를 사용한다.

Accuracy

Precision

Recall ⭐ (Attack 탐지에서 핵심)

F1-score

Confusion Matrix (wandb 시각화)

🏗️ Project Structure
garo_sero_reverse/
├── test/
│   └── train_test.py        # 모델 학습 및 평가 스크립트
├── hf_cache/                # HuggingFace 캐시 (gitignore)
├── wandb/                   # 실험 로그 (gitignore)
├── defense_xlmr_results/    # 학습 결과 (gitignore)
├── xlmr_prompt_defense/     # 최종 모델 저장 경로
├── .gitignore
└── README.md

⚙️ Environment Setup
Requirements

Python 3.9+

CUDA-enabled GPU (권장)

PyTorch (CUDA build)

transformers >= 4.5x

datasets, evaluate, wandb

Install
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install transformers datasets evaluate wandb

🚀 Training
python test/train_test.py


학습 중:

GPU 사용 여부 확인 가능 (nvidia-smi)

wandb 대시보드에서 실험 로그 실시간 확인

📈 Experiment Tracking

Weights & Biases (wandb) 사용

Epoch별 Loss / Metric / Confusion Matrix 자동 기록

실험 비교 및 재현성 확보

🔒 Notes

모델 가중치, 캐시, 실험 로그는 Git에 포함되지 않음

본 레포지토리는 연구 및 실험 목적으로 설계됨

실제 서비스 적용 시 Threshold 조정 및 추가 검증 필요

🧩 Future Work

Prompt Injection 강도(Degree)를 반영한 가중 학습

다중 데이터셋 결합을 통한 일반화 성능 향상

FastAPI 기반 AI 서버 연동

Real-time LLM 요청 필터링 시스템 확장

👤 Author

황순규 (SoonGyu Hwang)

Software Convergence / AI

Prompt Injection Defense & AI Safety Research
