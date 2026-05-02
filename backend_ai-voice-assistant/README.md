# Natasha | Voice Assistant
Natasha is a voice assistant I developed for educational purposes.


## What can Natasha do?
| No. | Command | 
Voice Commands |
-------------------------------------------------------------------------------------------------------|

| 01  | Name |
`what is your name` / `what's your name` / `tell me your name` / `may i know your name` / `your name`|

| 02  | Introduction |
`introduce yourself` / `introduce` / `who are you` / `tell me about yourself` / `tell me about you` / `about yourself` / `yourself`|

| 03  | Date |
`what is the date` / `today's date` / `today date` / `tell me the date` / `date today` / `date`|

| 04  | Time | 
`what time is it` / `current time` / `tell me the time` / `time now` / `time`|

| 05  | Welcome after Thanking | 
`thanks` / `thank you` / `thanks a lot` / `thank you so much` / `appreciate it`|

| 06  | Casual Greeting | 
`hello` / `hi` / `hey` / `good morning` / `good afternoon` / `good evening`|

| 07  | How Are You | 
`how are you` / `how are you doing` / `how is it going` / `are you okay` / `how do you do`|

| 08  | User Mood Response | 
`i am fine` / `i'm fine` / `im fine` / `i am good` / `i'm good` / `im good` / `doing good` / `doing well`|

| 09  | Assistant Status | 
`are you there` / `can you hear me` / `do you hear me` / `are you listening`|

| 10  | Creator Info | 
`who made you` / `who created you` / `who built you` / `who developed you`|

| 11  | Quick Help | 
`help me` / `assist me` / `what can you do` / `show commands` / `list commands`|

| 12  | Go Offline | 
`go offline` / `close assistant` / `stop assistant` / `bye-bye` / `bye bye` / `goodbye` / `exit` / `quit`|

| 13  | Shutdown Computer | 
`shut down the computer` / `shutdown the computer` / `shut down my computer` / `shutdown my computer` / `turn off the computer` / `turn off my computer` / `turn off computer` / `power off computer` / `power off pc` / `shutdown`|

| 14  | Restart Computer | 
`restart the computer` / `restart my computer` / `restart computer` / `reboot the computer` / `reboot my computer` / `reboot computer` / `restart pc` / `reboot pc` / `restart`|

| 15  | Lock the Screen | 
`lock the screen` / `lock my screen` / `lock screen` / `lock my computer` / `lock the computer` / `lock computer` / `lock this pc` / `lock pc` / `sign out` / `log out` / `logout`|

| 16  | Search in Wikipedia | `search wikipedia` / `look up on wikipedia` / `find on wikipedia` / `wikipedia` / `wiki`|

| 17  | Open Google/Chrome | 
`open google` / `launch google` / `open chrome` / `start chrome`|

| 18  | Search in Google | 
`search google for` / `google search` / `search the web for` / `search web for` / `find on google` / `google`|

| 19  | Open YouTube | 
`open youtube` / `launch youtube` / `start youtube` / `open yt`|

| 20  | Search in YouTube | 
`search youtube for` / `youtube search` / `find on youtube` / `youtube`|

| 21  | Open WhatsApp Web | 
`open whatsapp web` / `open whatsapp` / `launch whatsapp`|

| 22  | Open Facebook | 
`open facebook` / `launch facebook` / `start facebook` / `open fb`|

| 23  | Search in Facebook | 
`search facebook for` / `facebook search` / `fb search` / `facebook` / `fb`|

| 24  | CPU and Battery Details | 
`battery percentage` / `battery level` / `cpu usage` / `battery` / `cpu`|

| 25  | Open Firefox | 
`open firefox` / `launch firefox` / `start firefox`|

| 26  | Open Android Studio | 
`open android studio` / `launch android studio` / `start android studio`|

| 27  | Open Telegram | 
`open telegram` / `launch telegram` / `start telegram` / `open tg`|

| 28  | Take Notes | 
`take note` / `make note` / `write note` / `note this` / `note down` / `note`|

| 29  | Tell Stories | 
`read my note` / `read note` / `read story` / `tell story` / `story`|

| 30  | Take Screenshot | 
`capture screenshot` / `take screenshot` / `screen shot` / `screenshot` / `take a ss` / `take ss` / `get a ss` / `get ss`|

| 31  | Play Sinhala Songs | 
`play sinhala songs` / `play sinhala song` / `sinhala songs` / `sinhala song`|

| 32  | Play English Songs | 
`play english songs` / `play english song` / `english songs` / `english song`|

| 33  | Play Songs | 
`play songs` / `play song` / `play music` / `songs` / `song` / `music`|

| 34  | Read Reminder | 
`read what you remember` / `what did you remember` / `what do you remember` / `do you remember` / `read reminder` / `read remember`|

| 35  | Save Reminder | 
`remember this` / `remember that` / `save this` / `take reminder` / `remember`|

| 36  | Tell Top News Headlines | 
`top headlines` / `latest news` / `news headlines` / `tell me the news` / `news`|

| 37  | Search Location using Google Map | 
`find location of` / `show location of` / `location of` / `where's` / `where is` / `locate`|

| 38  | Calculator Functions | 
`calculate` / `solve` / `compute`|

| 39  | Explain using Science | 
`tell me about` / `explain` / `define` / `what is` / `who is`|

| 40  | Stop Listening Mode | 
`stop listening` / `pause listening` / `stop listen` / `go to sleep` / `take a nap` / `sleep`|

| 41  | Send WhatsApp Messages | 
`send whatsapp message` / `whatsapp message` / `send whatsapp` / `whatsapp`|

| 42  | Wake Greeting | 
`hello natasha` / `hey natasha` / `hi natasha`|

| 43  | Natasha Response |
`natasha`|

<hr>

## Getting Started
- Change the name in `editables.py` for pronouncing
- Change the real_name in `editables.py` for printing
- You can enable password uncommenting lines 30-49 in `main.py`
- Change the password in `editables.py`
- Change paths in `editables.py` for Folders, Applications and Songs
- Get API key for [News](https://newsapi.org/) and change in `editables.py`
- Get API key for [Wolframalpha](https://developer.wolframalpha.com/) and change in `editables.py`
- Change names and phone numbers in `phone_book.py` for WhatsApp

## Python 3.10 Setup
- Create virtual environment:
  `py -3.10 -m venv .venv`
- Activate:
  `.venv\Scripts\Activate.ps1`
- Install dependencies:
  `python -m pip install --upgrade pip`
  `python -m pip install -r requirements-py310.txt`
- Run assistant:
  `python main.py`

## Web API Bridge (for React frontend)
- Install dependencies (same venv):
  `python -m pip install -r requirements-py310.txt`
- Run API server:
  `python -m uvicorn api_server:app --host 0.0.0.0 --port 8000 --reload`
- Optional CORS override (comma separated):
  `set ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080`

