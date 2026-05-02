import os
import datetime
import pyautogui
import editables
import speak


def screenshot():
    date = datetime.datetime.now().date()
    time = datetime.datetime.now().strftime("%H-%M-%S")

    # Ensure screenshots folder exists
    os.makedirs(editables.screenshots, exist_ok=True)

    file_name = os.path.join(editables.screenshots, f"{date}-{time}.png")

    image = pyautogui.screenshot()
    image.save(file_name)
    print(f"Screenshot saved to {file_name}")
    speak.speak("Screenshot taken successfully.")
