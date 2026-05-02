import platform
import re
import subprocess
import threading

import pyttsx3
from colorama import Fore, Style

import editables


speech_enabled = True
speech_lock = threading.Lock()


def _split_text(text, max_chars=220):
    cleaned_text = re.sub(r"\s+", " ", str(text)).strip()
    if not cleaned_text:
        return []

    sentence_parts = re.split(r"(?<=[.!?;:])\s+", cleaned_text)
    chunks = []
    current = ""

    for sentence in sentence_parts:
        sentence = sentence.strip()
        if not sentence:
            continue

        if len(sentence) > max_chars:
            words = sentence.split()
            for word in words:
                candidate = f"{current} {word}".strip() if current else word
                if len(candidate) <= max_chars:
                    current = candidate
                else:
                    if current:
                        chunks.append(current)
                    current = word
            continue

        candidate = f"{current} {sentence}".strip() if current else sentence
        if len(candidate) <= max_chars:
            current = candidate
        else:
            if current:
                chunks.append(current)
            current = sentence

    if current:
        chunks.append(current)

    return chunks


def _build_engine():
    if platform.system() == "Windows":
        engine = pyttsx3.init(driverName="sapi5")
    else:
        engine = pyttsx3.init()

    voices = engine.getProperty("voices")
    if voices:
        voice_index = editables.gender if 0 <= editables.gender < len(voices) else 0
        engine.setProperty("voice", voices[voice_index].id)

    engine.setProperty("rate", editables.rate)
    return engine


def _speak_with_pyttsx3(chunks):
    engine = _build_engine()
    for chunk in chunks:
        engine.say(chunk)
    engine.runAndWait()
    engine.stop()


def _speak_with_windows_fallback(chunks):
    if platform.system() != "Windows":
        return False

    for chunk in chunks:
        escaped = chunk.replace("'", "''")
        command = (
            "Add-Type -AssemblyName System.Speech;"
            "$speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer;"
            "$speaker.Rate = 0;"
            f"$speaker.Speak('{escaped}');"
        )
        subprocess.run(
            ["powershell", "-NoProfile", "-Command", command],
            check=True,
            capture_output=True,
            text=True,
        )
    return True


def _say(audio):
    global speech_enabled

    chunks = _split_text(audio)
    if not chunks:
        return

    with speech_lock:
        try:
            _speak_with_pyttsx3(chunks)
            speech_enabled = True
            return
        except Exception as ex:
            speech_enabled = False
            print(Fore.YELLOW + f"Speech output failed: {ex}" + Style.RESET_ALL)

        try:
            if _speak_with_windows_fallback(chunks):
                speech_enabled = True
                return
        except Exception as fallback_ex:
            print(Fore.YELLOW + f"Speech fallback failed: {fallback_ex}" + Style.RESET_ALL)


def speak(audio):
    print(Fore.GREEN + str(audio) + Style.RESET_ALL)
    _say(audio)


def speak_only(audio):
    _say(audio)
