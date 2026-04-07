# 🛰️ AgriModelInsight: Control Center Commands

Follow these steps to launch your high-tech dashboard locally.

### 1. 🧬 Start the Backend (API)
The backend runs the 4 Machine Learning models and handles prediction requests.
```bash
# From the root directory:
cd api
python3 main.py
```
*Note: Once it says "Serving Flask app", it's ready.*

### 2. 🖥️ Start the Frontend (Dashboard UI)
The React dashboard is your "Neural Command Center".
```bash
# Open a NEW terminal window, then:
cd frontend
npm run dev
```
*Note: Your dashboard will be live at http://localhost:5173/*

---

### 🌐 How to Forward Ports (Share with Others)
If you want to view the dashboard on your phone or send the link to someone else:

**Step A: Forward the Frontend**
```bash
ngrok http 5173
```

**Step B: Let the phone talk to the backend**
Since the dashboard calls the API, you must update the URL in `frontend/src/App.jsx` if you want it to work on another device:
1. Run `npx localtunnel --port 5001`.
2. Copy the new tunnel URL (e.g., `https://example.loca.lt`).
3. Open `frontend/src/App.jsx` and change `API_BASE` (line 72) to your new tunnel URL.

---

### 🛠️ Troubleshooting
*   **Port already in use**: If you get an error that port 5001 or 5173 is busy, run:
    `lsof -i :5001,5173 -t | xargs kill -9`
*   **Missing packages**: If backend fails, run `pip install -r requirements.txt`.
