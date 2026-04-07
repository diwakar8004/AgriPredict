# AgriModelInsight Dashboard

A premium, AI-powered agricultural intelligence dashboard integrating 4 local machine learning models for real-time farming insights.

## Features
- **Irrigation Need Prediction**: Analyzes soil moisture, pH, and environmental metrics.
- **Sustainability Scoring**: Evaluates farm operational impact and eco-standards.
- **Market Price Forecasting**: Predicts product value based on demand/supply indices.
- **Yield Estimation**: Projects crop outcome based on farm size and soil quality.

## Tech Stack
- **Frontend**: React (Vite), Axios, Lucide Icons, Glassmorphism Design System.
- **Backend**: Flask API, Pandas, Joblib, Scikit-learn, XGBoost.
- **Theme**: "Biolume Intelligence" (Deep Forest Green & Cyber Cyan).

## Setup & Running

### 1. Prerequisites
- Python 3.9+ 
- Node.js & npm
- `libomp` (Required for XGBoost on macOS):
  ```bash
  brew install libomp
  ```

### 2. Start the Backend
```bash
cd api
pip install -r requirements.txt
python main.py
```
*Port: 5001*

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
*Port: 5173* (or as assigned by Vite)

## Project Structure
- `/api`: Flask server and model loading logic.
- `/frontend`: React dashboard and design tokens.
- `/models`: Local `.joblib` and `.pkl` model files.

---
Designed with Biolume Intelligence.
