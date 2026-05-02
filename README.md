# AI-Voice-Assistant

## One Command Run
- `python run_all.py`

## Run Backend
1. `cd backend_ai-voice-assistant`
2. `py -3.10 -m venv .venv`
3. `.venv\Scripts\Activate.ps1`
4. `python -m pip install -r requirements-py310.txt`
5. `python -m uvicorn api_server:app --host 0.0.0.0 --port 8000 --reload`

## Run Frontend
1. `cd frontend_ai-voice-assistant`
2. `npm install`
3. `copy .env.example .env`
4. `npm run dev`
