# Frontend (React + Vite)

## Setup
1. Install dependencies:
   `npm install`
2. Copy env file:
   `copy .env.example .env`
3. Start dev server:
   `npm run dev`

## Backend Connection
- Frontend reads `VITE_BACKEND_URL` (default: `http://localhost:8000`)
- Set `VITE_USE_MOCK=true` only if you want to run UI without backend
