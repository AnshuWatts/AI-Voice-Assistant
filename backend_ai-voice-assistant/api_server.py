from __future__ import annotations

import os
import time
import uuid
from collections import deque
from contextlib import contextmanager
from dataclasses import dataclass, field
from typing import Callable, Deque, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import about_natasha
import applications as app_actions
import basic
import chrome
import cpu
import editables
import location
import news
import notes_module
import remember
import screenshot
import songs
import speak
import wiki
import wolframalphaFunctions


def _contains_any(query: str, phrases: tuple[str, ...]) -> bool:
    return any(phrase in query for phrase in phrases)


def _is_casual_greeting(query: str) -> bool:
    normalized = query.strip()
    base_greetings = ("hello", "hi", "hey", "good morning", "good afternoon", "good evening")
    if normalized in base_greetings:
        return True
    return normalized.startswith(("hello ", "hi ", "hey "))


@contextmanager
def capture_speech(buffer: list[str]):
    original_speak = speak.speak
    original_speak_only = speak.speak_only

    def _capture(audio):
        text = str(audio).strip()
        if text:
            buffer.append(text)

    speak.speak = _capture
    speak.speak_only = _capture
    try:
        yield
    finally:
        speak.speak = original_speak
        speak.speak_only = original_speak_only


class AssistantStatusModel(BaseModel):
    state: str
    connection: str
    micAvailable: bool
    voiceOutputEnabled: bool
    lastCommand: Optional[str] = None


class CommandRequest(BaseModel):
    command: str


class VoiceSettingsRequest(BaseModel):
    enabled: bool


class CommandLogModel(BaseModel):
    id: str
    command: str
    response: str
    status: str
    timestamp: int
    category: Optional[str] = None


class ChatMessageModel(BaseModel):
    id: str
    role: str
    text: str
    timestamp: int


class SendCommandResultModel(BaseModel):
    message: ChatMessageModel
    log: CommandLogModel


@dataclass
class RuntimeState:
    state: str = "idle"
    connection: str = "connected"
    mic_available: bool = False
    voice_output_enabled: bool = True
    last_command: Optional[str] = None
    history: Deque[dict] = field(default_factory=lambda: deque(maxlen=100))

    def to_status(self) -> AssistantStatusModel:
        return AssistantStatusModel(
            state=self.state,
            connection=self.connection,
            micAvailable=self.mic_available,
            voiceOutputEnabled=self.voice_output_enabled,
            lastCommand=self.last_command,
        )


runtime = RuntimeState()
app = FastAPI(title="Natasha Assistant API", version="1.0.0")

allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "*")
allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]
if not allowed_origins:
    allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _run_action(category: str, fn: Callable, *args) -> tuple[str, str]:
    outputs: list[str] = []
    with capture_speech(outputs):
        fn(*args)
    response_text = " ".join(outputs).strip() or "Done."
    return response_text, category


def _unsupported(message: str, category: str = "Control") -> tuple[str, str]:
    return message, category


def _execute_command(command: str) -> tuple[str, str]:
    query = command.lower().strip()
    if not query:
        return "Please enter a command.", "General"

    if _contains_any(query, ("what is your name", "what's your name", "tell me your name", "may i know your name", "your name")):
        return _run_action("Identity", about_natasha.say_name)

    if _contains_any(query, ("introduce yourself", "introduce", "who are you", "tell me about yourself", "tell me about you", "about yourself", "yourself")):
        return _run_action("Identity", about_natasha.introduce)

    if _contains_any(query, ("what is the date", "today's date", "today date", "tell me the date", "date today", "date")):
        return _run_action("Date", basic.tell_date)

    if _contains_any(query, ("what time is it", "current time", "tell me the time", "time now", "time")):
        return _run_action("Time", basic.tell_time)

    if _is_casual_greeting(query) and "natasha" not in query:
        return _run_action("Greeting", basic.casual_greeting, editables.name, editables.real_name)

    if _contains_any(query, ("how are you", "how are you doing", "how is it going", "are you okay", "how do you do")):
        return _run_action("Greeting", basic.how_are_you)

    if _contains_any(query, ("i am fine", "i'm fine", "im fine", "i am good", "i'm good", "im good", "doing good", "doing well")):
        return _run_action("Greeting", basic.glad_response)

    if _contains_any(query, ("are you there", "can you hear me", "do you hear me", "are you listening")):
        return _run_action("Status", basic.assistant_status)

    if _contains_any(query, ("who made you", "who created you", "who built you", "who developed you")):
        return _run_action("Identity", basic.creator_info)

    if _contains_any(query, ("help me", "assist me", "what can you do", "show commands", "list commands")):
        return _run_action("Help", basic.quick_help)

    if _contains_any(query, ("thanks a lot", "thank you so much", "appreciate it", "thank you", "thanks")):
        return "Pleasure to help you.", "Greeting"

    if _contains_any(query, ("go offline", "close assistant", "stop assistant", "bye-bye", "bye bye", "goodbye", "exit", "quit")):
        runtime.state = "sleeping"
        return "Going offline. Say or type 'hello natasha' to wake me.", "Control"

    if _contains_any(query, ("shut down the computer", "shutdown the computer", "shut down my computer", "shutdown my computer", "turn off the computer", "turn off my computer", "turn off computer", "power off computer", "power off pc", "shutdown")):
        return _unsupported("Shutdown needs interactive confirmation in desktop voice mode.")

    if _contains_any(query, ("restart the computer", "restart my computer", "restart computer", "reboot the computer", "reboot my computer", "reboot computer", "restart pc", "reboot pc", "restart")):
        return _unsupported("Restart needs interactive confirmation in desktop voice mode.")

    if _contains_any(query, ("lock the screen", "lock my screen", "lock screen", "lock my computer", "lock the computer", "lock computer", "lock this pc", "lock pc", "sign out", "log out", "logout")):
        return _unsupported("Screen lock is disabled in API mode for safety.")

    if _contains_any(query, ("search wikipedia", "look up on wikipedia", "find on wikipedia", "wikipedia", "wiki")):
        return _run_action("Search", wiki.wikipedia_search, query, editables.name, editables.real_name)

    if _contains_any(query, ("open google", "launch google", "open chrome", "start chrome")):
        return _run_action("Browser", chrome.open_google)

    if _contains_any(query, ("search google for", "google search", "search the web for", "search web for", "find on google", "google")):
        return _run_action("Search", chrome.search_google, query)

    if _contains_any(query, ("open youtube", "launch youtube", "start youtube", "open yt")):
        return _run_action("Browser", chrome.open_youtube)

    if _contains_any(query, ("search youtube for", "youtube search", "find on youtube", "youtube")):
        return _run_action("Search", chrome.search_youtube, query)

    if _contains_any(query, ("open whatsapp web", "open whatsapp", "launch whatsapp")):
        return _run_action("Browser", chrome.open_whatsapp)

    if _contains_any(query, ("open facebook", "launch facebook", "start facebook", "open fb")):
        return _run_action("Browser", chrome.open_facebook)

    if _contains_any(query, ("search facebook for", "facebook search", "fb search", "facebook", "fb")):
        return _run_action("Search", chrome.search_facebook, query)

    if _contains_any(query, ("battery percentage", "battery level", "cpu usage", "battery", "cpu")):
        return _run_action("System", cpu.cpu_battery)

    if _contains_any(query, ("open firefox", "launch firefox", "start firefox")):
        return _run_action("Apps", app_actions.open_firefox)

    if _contains_any(query, ("open android studio", "launch android studio", "start android studio")):
        return _run_action("Apps", app_actions.open_android_studio)

    if _contains_any(query, ("open telegram", "launch telegram", "start telegram", "open tg")):
        return _run_action("Apps", app_actions.open_telegram)

    if _contains_any(query, ("take note", "make note", "write note", "note this", "note down", "note")):
        return _unsupported("Notes capture needs live microphone input in desktop voice mode.", "Notes")

    if _contains_any(query, ("read my note", "read note", "read story", "tell story", "story")):
        return _run_action("Notes", notes_module.read_note)

    if _contains_any(query, ("capture screenshot", "take screenshot", "screen shot", "screenshot", "take a ss", "take ss", "get a ss", "get ss")):
        return _run_action("System", screenshot.screenshot)

    if _contains_any(query, ("play sinhala songs", "play sinhala song", "sinhala songs", "sinhala song")):
        return _run_action("Media", songs.play_sinhala_song)

    if _contains_any(query, ("play english songs", "play english song", "english songs", "english song")):
        return _run_action("Media", songs.play_english_song)

    if _contains_any(query, ("play songs", "play song", "play music", "songs", "song", "music")):
        return _run_action("Media", songs.play_song)

    if _contains_any(query, ("read what you remember", "what did you remember", "what do you remember", "do you remember", "read reminder", "read remember")):
        return _run_action("Notes", remember.read_remember)

    if _contains_any(query, ("remember this", "remember that", "save this", "take reminder", "remember")):
        return _unsupported("Reminder capture needs live microphone input in desktop voice mode.", "Notes")

    if _contains_any(query, ("top headlines", "latest news", "news headlines", "tell me the news", "news")):
        return _run_action("News", news.news)

    if _contains_any(query, ("find location of", "show location of", "location of", "where's", "where is", "locate")):
        return _run_action("Location", location.location, query)

    if _contains_any(query, ("calculate", "solve", "compute")):
        return _run_action("Math", wolframalphaFunctions.calculate, query)

    if _contains_any(query, ("tell me about", "explain", "define", "what is", "who is")):
        return _run_action("Knowledge", wolframalphaFunctions.explain, query)

    if _contains_any(query, ("stop listening", "pause listening", "stop listen", "go to sleep", "take a nap", "sleep")):
        runtime.state = "sleeping"
        return "Sleeping now. Say or type 'hello natasha' to wake me.", "Control"

    if _contains_any(query, ("send whatsapp message", "whatsapp message", "send whatsapp", "whatsapp")):
        return _unsupported("WhatsApp send flow needs live microphone input in desktop voice mode.", "Messaging")

    if _contains_any(query, ("hello natasha", "hey natasha", "hi natasha")):
        runtime.state = "idle"
        return _run_action("Greeting", basic.greeting, editables.name, editables.real_name)

    if "natasha" in query:
        runtime.state = "idle"
        return _run_action("Greeting", about_natasha.natasha)

    return f'I heard "{command}". Try "help me" to see supported commands.', "General"


@app.get("/status", response_model=AssistantStatusModel)
def get_status():
    if runtime.state == "sleeping":
        state = runtime.to_status()
        state.connection = "connected"
        return state
    runtime.connection = "connected"
    return runtime.to_status()


@app.get("/history", response_model=list[CommandLogModel])
def get_history():
    return list(runtime.history)


@app.post("/listen/start")
def start_listening():
    runtime.state = "listening"
    time.sleep(0.15)
    runtime.state = "idle"
    # Browser mic capture should be handled on the frontend.
    return {"transcript": ""}


@app.post("/listen/stop")
def stop_listening():
    runtime.state = "idle"
    return {"ok": True}


@app.post("/settings/voice", response_model=AssistantStatusModel)
def set_voice(settings: VoiceSettingsRequest):
    runtime.voice_output_enabled = settings.enabled
    return runtime.to_status()


@app.post("/command", response_model=SendCommandResultModel)
def run_command(body: CommandRequest):
    command = body.command.strip()
    runtime.last_command = command or runtime.last_command
    runtime.state = "executing"

    try:
        response_text, category = _execute_command(command)
        command_status = "success"
    except Exception as ex:
        response_text = f"Command failed: {ex}"
        category = "Error"
        command_status = "error"
        runtime.state = "error"

    log = {
        "id": str(uuid.uuid4()),
        "command": command,
        "response": response_text,
        "status": command_status,
        "timestamp": int(time.time() * 1000),
        "category": category,
    }
    runtime.history.appendleft(log)

    if runtime.state != "sleeping":
        runtime.state = "idle"

    return {
        "message": {
            "id": str(uuid.uuid4()),
            "role": "assistant",
            "text": response_text,
            "timestamp": int(time.time() * 1000),
        },
        "log": log,
    }
