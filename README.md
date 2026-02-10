# Ground Clash - Event Registration System

A complete real-time event registration system for "Ground Clash" featuring Badminton and Volleyball.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Python Flask
- **Database:** Excel (.xlsx) using openpyxl
- **API:** REST (Axios)

## Project Structure
```
/electra
  /backend
    app.py                # Flask Application
    ground_clash_registrations.xlsx  # Database (Auto-generated)
  /frontend
    /src
      /components
      /pages
        Home.jsx
        Register.jsx
        AdminLogin.jsx
        AdminDashboard.jsx
      api.js
      App.jsx
      main.jsx
```

## Setup & Run Instructions

### 1. Backend (Flask)
Open a terminal in the `backend` folder:
```bash
cd backend
pip install -r requirements.txt
python app.py
```
*The server will start at http://localhost:5000*

### 2. Frontend (React)
Open a new terminal in the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
*The application will open at http://localhost:5173*

## Features
- **Public:** Landing page with event details.
- **Registration:** Dynamic form for Singles, Duos, and Teams (6).
- **Validation:** Prevents duplicate registrations and validates inputs.
- **Admin:** Login (admin/admin123) to view dashboard and download Excel data.

## API Endpoints
- `POST /register`: Register a new team/player.
- `GET /registrations`: Get all registrations (Admin).
- `GET /download-excel`: Download the registrations Excel file.
