# Electra: College Arena League - Ground Clash Registration System

A cinematic, high-energy event registration platform for the "Ground Clash" sports event. Built with a premium SCI-FI aesthetic and real-time administrative control.

## 🚀 Key Features

### 🎮 Player Experience
- **Cinematic Landing Page:** Modern sports-poster style UI with smooth animations.
- **Dynamic Registration:** Intelligent form handling for **Badminton** (Solo/Duo) and **Volleyball** (Solo/Squad of 6).
- **Official Protocol:** Dedicated pages for **Indoor Stadium Guidelines** and the **Official Rule Book**.
- **Dynamic UPI Gateway:** Real-time generation of custom UPI QR codes with fixed amounts and transaction notes using `qrcode.react`.
- **Proof Transmission:** Direct upload of payment screenshots to the backend server for manual verification.

### 🔐 Administrative Command Centre
- **Secure Access:** Industrial-grade login terminal with masked codename inputs.
- **Live Roster Intelligence:** Real-time view of all registrations with deep-filtering and search capabilities.
- **Evidence Verification:** Instant full-screen modal view for payment proof verification.
- **Gateway Configurator:** Edit Backend UPI ID and QR asset directly from the dashboard.
- **Data Export:** Single-click export of entire registration database to Excel format.
- **Database Reset:** Critical system reset ("NUKE") button with security safeguards.

## 🛠️ Tech Stack
- **Frontend:** React 19, Tailwind CSS 4, Vite, Axios, React Router, qrcode.react.
- **Backend:** Python Flask, openpyxl, Flask-CORS.
- **Database:** Local Excel Ledger (`xlsx`).

## ⚡ Setup & Execution

### 1. Initialize Backend (Python)
Navigate to the `backend` directory:
```bash
cd backend
pip install -r requirements.txt
python app.py
```
*Port configuration: http://0.0.0.0:5001*

### 2. Launch Interface (React)
Navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
*Access via: http://localhost:5174*

## 📱 Network Access

### Local Network (Same Wi-Fi)
Access from any device on the same network:
- **Frontend:** `http://YOUR_IP:5174`
- **Example:** `http://10.35.14.236:5174`

### Deployment to Render

This application is configured for deployment on [Render](https://render.com).

1. Push the code to a GitHub repository.
2. In the Render Dashboard, create a new **Blueprint** and connect your repository.
3. Render will automatically detect the `render.yaml` configuration and deploy::
   - **Backend Web Service** (Python Flask) with persistent disk storage.
   - **Frontend Static Site** (React Vite).

## 📝 Admin Credentials
- **Username:** `hraj48147`
- **Password:** `985250`

## 📁 System Architecture
```text
/electra
  /backend
    app.py                # Core API & Data Logic
    uploads/              # Payment Proof & QR Assets
    settings.json         # Dynamic Gateway Config
  /frontend
    /src
      /pages              # Cinematic UI Layouts
      /components         # Modular SCI-FI components
      api.js              # Backend Tunnel Configuration
      index.css           # Global Design System
```

---
*Developed for Electra | Ground Clash 2026*
