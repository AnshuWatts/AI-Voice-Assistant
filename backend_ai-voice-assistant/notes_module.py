import os
import datetime
import editables
import speak
import commands as cmd

def write_note():
    speak.speak('What should I write?')
    answer = cmd.takeCommand().lower()
    
    date = datetime.datetime.now().date()
    time = datetime.datetime.now().strftime("%H-%M-%S")
    
    os.makedirs(editables.notes, exist_ok=True)
    
    file_name = os.path.join(editables.notes, f"{date}-{time}.txt")
    
    if os.path.exists(file_name):
        speak.speak('A note with this timestamp already exists. Skipping creation.')
    else:
        with open(file_name, 'w') as file:
            file.write(f"""
Date: {date}
Time: {time}

{answer}
            """)
        speak.speak('Done taking notes.')

def read_note():
    file_name = os.path.join(editables.notes, 'note.txt')
    
    if os.path.exists(file_name):
        with open(file_name, 'r') as file:
            content = file.read()
            speak.speak(content)
    else:
        speak.speak("Sorry, I couldn't find any note named 'note.txt'.")
        