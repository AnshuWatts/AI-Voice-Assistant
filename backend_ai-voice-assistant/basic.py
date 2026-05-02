import os
import ctypes
import speak
import datetime as dt
import commands as cmd
from colorama import Fore, Style


# Time
def tell_time():
    time = dt.datetime.now().strftime("%H:%M:%S")
    print(Fore.GREEN + dt.datetime.now().strftime("%H:%M") + Style.RESET_ALL)
    speak.speak_only(time)


# Date
def tell_date():
    date = dt.datetime.now().date()
    speak.speak(date)


# Greeting
def greeting(name, real_name):
    hour = dt.datetime.now().hour

    if hour < 4:
        print(Fore.GREEN + f'Hello {real_name}' + Style.RESET_ALL)
        speak.speak_only(f'Hello {name}')
    elif hour < 12:
        print(Fore.GREEN + f'Good Morning {real_name}' + Style.RESET_ALL)
        speak.speak_only(f'Good Morning {name}')
    elif hour < 16:
        print(Fore.GREEN + f'Good Afternoon {real_name}' + Style.RESET_ALL)
        speak.speak_only(f'Good Afternoon {name}')
    else:
        print(Fore.GREEN + f'Good Evening {real_name}' + Style.RESET_ALL)
        speak.speak_only(f'Good Evening {name}')

    speak.speak('How can I help you?')


# Go offline
def go_offline(name, real_name):
    print(Fore.GREEN + f'Good bye {real_name}, Have a nice day!' + Style.RESET_ALL)
    speak.speak_only(f'Good bye {name}, Have a nice day!')
    quit()


# Shutdown Computer
def shutdown():
    speak.speak('Do you want to shut down your computer?')
    answer = cmd.takeCommand().lower()

    if any(word in answer for word in ('yes', 'sure', 'ok', 'okay', 'confirm')):
        speak.speak('Shutting down computer!')
        os.system("shutdown /s /t 1")
    else:
        speak.speak('Shutdown cancelled.')


# Restart Computer
def restart():
    speak.speak('Do you want to restart your computer?')
    answer = cmd.takeCommand().lower()

    if any(word in answer for word in ('yes', 'sure', 'ok', 'okay', 'confirm')):
        speak.speak('Restarting computer!')
        os.system("shutdown /r /t 1")
    else:
        speak.speak('Restart cancelled.')


def lock_screen():
    speak.speak('Locking the screen!')
    try:
        ctypes.windll.user32.LockWorkStation()
    except Exception:
        os.system("rundll32.exe user32.dll,LockWorkStation")


def logout():
    lock_screen()


# Casual Greeting
def casual_greeting(name, real_name):
    print(Fore.GREEN + f'Hello {real_name}' + Style.RESET_ALL)
    speak.speak_only(f'Hello {name}')
    speak.speak('How can I help you?')


# Health Check
def how_are_you():
    speak.speak('I am doing great. Thank you for asking. How are you?')


# Positive Mood Response
def glad_response():
    speak.speak('Glad to hear that.')


# Assistant Availability
def assistant_status():
    speak.speak('Yes, I am here and ready to help you.')


# Creator Info
def creator_info():
    speak.speak('I was created as Natasha, your personal voice assistant.')


# Quick Help
def quick_help():
    speak.speak('You can ask for time, date, web search, songs, notes, reminders, location, and news.')
