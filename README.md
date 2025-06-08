# 🌀 BlurDetection.io

This project detects whether an image is **blurry** or **sharp** using a complete pipeline combining:

- 📊 Traditional ML with handcrafted features
- 🧠 Deep Learning (ResNet50, ViT)
- ☁️ Roboflow-hosted model API
- ⚡ FastAPI backend
- 🌐 Next.js + Tailwind + TypeScript frontend
- 🚀 Vercel deployment

---

## 🧠 Pipeline Architecture?

Blur detection is a **computer vision problem** that can be approached in two main ways:

1. **Handcrafted Feature Extraction + Traditional ML**
2. **End-to-End Deep Learning Models (CNNs, ResNet, ViT)**

Each has its benefits, depending on compute, accuracy, interpretability, and scalability needs.

---

### 1️⃣ Traditional ML with Handcrafted Features

#### ✅ Why Use:
- **Lightweight**: Fast and usable on CPUs.
- **Interpretable**: You can inspect which features contribute most.
- **Great for edge devices**.

#### 🧪 What It Does:
We extract **blur-sensitive features** from the image, such as:

- **Variance of Laplacian**: Measures high-frequency content. Low = blurry.
- **Sobel/Tenengrad**: Gradient-based edge strength.
- **FFT Energy**: Frequency domain sharpness.
- **Canny Edges**: Counts of edges can correlate with image clarity.
- **RMS Contrast**: Blurred images tend to have low contrast.

These features are then fed into ML models like:

- `RandomForestClassifier`
- `XGBoostClassifier`
- `Support Vector Machine (SVM)`
- `LogisticRegression`

#### 📈 Advantages:
- Quick training, explainable
- Easily tune hyperparameters
- Less data required

#### 🧪 Used For:
- Baseline performance
- Understanding which image features most affect blur

---

### 2️⃣ CNNs (Convolutional Neural Networks)

#### ✅ Why Use:
- Automatically learn spatial filters
- Works well for blurry patterns like defocus, motion, or low contrast

#### 🧠 What It Does:
- Learns from pixel values directly
- Applies **convolutional filters** to detect edges, textures, shapes
- Learns hierarchical feature representations (low-level → high-level)

#### ⚙️ Architecture Used:
- ResNet50 (CNN)
  - Pretrained on ImageNet
  - Input: 224x224 resized images
  - Loss: CrossEntropyLoss
  - Optimizer: Adam
- ViT (Vision Transformer)
  - Image patches with attention
  - Optimizer: AdamW
  - Scheduler: StepLR

#### 🧪 Used For:
- Accurate predictions with **large image datasets**
- Capture complex, non-obvious patterns beyond handcrafted features

---

## 🌐 Roboflow API

### 🟡 Results from ViT model trained on Roboflow 

<img src="https://github.com/user-attachments/assets/571de144-5c01-4c69-8d4d-fc6b691dc044" width="500"/>
<img src="https://github.com/user-attachments/assets/ae49d486-d478-495a-b202-cc3354c7ff19" width="500"/>
<img src="https://github.com/user-attachments/assets/ca4c9ac7-bbff-4d42-bcf8-6de9765143a3" width="500"/>

### 🧪 Testing a Local Image via CLI

```bash
base64 YOUR_IMAGE.jpg | curl -d @- \
  "https://classify.roboflow.com/blurdetection-d9o8a/1?api_key=YOUR_API_KEY" 
```

## 🔗 FastAPI Backend

### Test the backend

```bash
git clone https://github.com/SagarBajaj14/BlurDetection.io.git
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
<img src="https://github.com/user-attachments/assets/60702a02-94a5-443c-af9b-5a21a44d71e0" width="500" />

Public API Link: https://lostguy14-blurdetection.hf.space/docs

## 🌐 Frontend (Next.js + TailwindCSS + TypeScript + Vercel)

Link to the website: 
