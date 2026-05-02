import stop_listening
import whatsapp
import wolframalphaFunctions
import location
import news
import remember
import about_natasha
import basic
import chrome
import commands as cmd
import cpu
import notes_module
import screenshot
import songs
import wiki
import speak
import applications as app
import editables


name = editables.name
real_name = editables.real_name
real_password = editables.real_password
notLogged = True
password_count = 0


if __name__ == "__main__":

# password
    speak.speak('Hello, Please tell me the password?')
    while notLogged:
        password_count = password_count + 1
        password = cmd.takeCommand_without_print().lower()

        if password == real_password:
            notLogged = False
        elif password_count >= 5:
            speak.speak('Going offline')
            quit()
        elif password == 'none':
            speak.speak('Please tell me the password?')
        elif 'bye bye' in password:
            speak.speak('Going offline')
            quit()
        elif 'go offline' in password:
            speak.speak('Going offline')
            quit()
        else:
            speak.speak('Wrong Password, Please try again....') 

    # Main
    basic.greeting(name, real_name)
    while True:
        query = cmd.takeCommand().lower()

        # Name
        if any(phrase in query for phrase in (
                'what is your name',
                "what's your name",
                'tell me your name',
                'may i know your name',
                'your name')):
            about_natasha.say_name()

        # Introduce
        elif any(phrase in query for phrase in (
                'introduce yourself',
                'introduce',
                'who are you',
                'tell me about yourself',
                'tell me about you',
                'about yourself',
                'yourself')):
            about_natasha.introduce()

        # Date
        elif any(phrase in query for phrase in (
                'what is the date',
                "today's date",
                'today date',
                'tell me the date',
                'date today',
                'date')):
            basic.tell_date()

        # Time
        elif any(phrase in query for phrase in (
                'what time is it',
                'current time',
                'tell me the time',
                'time now',
                'time')):
            basic.tell_time()

        # Casual Greeting
        elif 'natasha' not in query and (
                query.strip() in (
                    'hello',
                    'hi',
                    'hey',
                    'good morning',
                    'good afternoon',
                    'good evening') or
                query.startswith('hello ') or
                query.startswith('hi ') or
                query.startswith('hey ')):
            basic.casual_greeting(name, real_name)

        # How Are You
        elif any(phrase in query for phrase in (
                'how are you',
                'how are you doing',
                'how is it going',
                'are you okay',
                'how do you do')):
            basic.how_are_you()

        # User Mood
        elif any(phrase in query for phrase in (
                "i am fine",
                "i'm fine",
                'im fine',
                'i am good',
                "i'm good",
                'im good',
                'doing good',
                'doing well')):
            basic.glad_response()

        # Assistant Status
        elif any(phrase in query for phrase in (
                'are you there',
                'can you hear me',
                'do you hear me',
                'are you listening')):
            basic.assistant_status()

        # Creator Info
        elif any(phrase in query for phrase in (
                'who made you',
                'who created you',
                'who built you',
                'who developed you')):
            basic.creator_info()

        # Quick Help
        elif any(phrase in query for phrase in (
                'help me',
                'assist me',
                'what can you do',
                'show commands',
                'list commands')):
            basic.quick_help()

        # Welcome
        elif any(phrase in query for phrase in (
                'thanks a lot',
                'thank you so much',
                'appreciate it',
                'thank you',
                'thanks')):
            speak.speak('Pleasure to help you')

        # Go offline
        elif any(phrase in query for phrase in (
                'go offline',
                'close assistant',
                'stop assistant',
                'bye-bye',
                'bye bye',
                'goodbye',
                'exit',
                'quit')):
            basic.go_offline(name, real_name)

        # Shutdown Computer
        elif any(phrase in query for phrase in (
                'shut down the computer',
                'shutdown the computer',
                'shut down my computer',
                'shutdown my computer',
                'turn off the computer',
                'turn off my computer',
                'turn off computer',
                'power off computer',
                'power off pc',
                'shutdown')):
            basic.shutdown()

        # Restart Computer
        elif any(phrase in query for phrase in (
                'restart the computer',
                'restart my computer',
                'restart computer',
                'reboot the computer',
                'reboot my computer',
                'reboot computer',
                'restart pc',
                'reboot pc',
                'restart')):
            basic.restart()

        # Lock Screen
        elif any(phrase in query for phrase in (
                'lock the screen',
                'lock my screen',
                'lock screen',
                'lock my computer',
                'lock the computer',
                'lock computer',
                'lock this pc',
                'lock pc',
                'sign out',
                'log out',
                'logout')):
            basic.lock_screen()

        # Wikipedia
        elif any(phrase in query for phrase in (
                'search wikipedia',
                'look up on wikipedia',
                'find on wikipedia',
                'wikipedia',
                'wiki')):
            wiki.wikipedia_search(query, name, real_name)

        # Open Google
        elif any(phrase in query for phrase in (
                'open google',
                'launch google',
                'open chrome',
                'start chrome')):
            chrome.open_google()

        # Search Google
        elif any(phrase in query for phrase in (
                'search google for',
                'google search',
                'search the web for',
                'search web for',
                'find on google',
                'google')):
            chrome.search_google(query)

        # Open Youtube
        elif any(phrase in query for phrase in (
                'open youtube',
                'launch youtube',
                'start youtube',
                'open yt')):
            chrome.open_youtube()

        # Search Youtube
        elif any(phrase in query for phrase in (
                'search youtube for',
                'youtube search',
                'find on youtube',
                'youtube')):
            chrome.search_youtube(query)

        # Open WhatsApp
        elif any(phrase in query for phrase in (
                'open whatsapp web',
                'open whatsapp',
                'launch whatsapp')):
            chrome.open_whatsapp()

        # Open FaceBook
        elif any(phrase in query for phrase in (
                'open facebook',
                'launch facebook',
                'start facebook',
                'open fb')):
            chrome.open_facebook()

        # Search FaceBook
        elif any(phrase in query for phrase in (
                'search facebook for',
                'facebook search',
                'fb search',
                'facebook',
                'fb')):
            chrome.search_facebook(query)

        # CPU and Battery
        elif any(phrase in query for phrase in (
                'battery percentage',
                'battery level',
                'cpu usage',
                'battery',
                'cpu')):
            cpu.cpu_battery()

        # Open Firefox
        elif any(phrase in query for phrase in (
                'open firefox',
                'launch firefox',
                'start firefox')):
            app.open_firefox()

        # Open Android Studio
        elif any(phrase in query for phrase in (
                'open android studio',
                'launch android studio',
                'start android studio')):
            app.open_android_studio()

        # Open Telegram
        elif any(phrase in query for phrase in (
                'open telegram',
                'launch telegram',
                'start telegram',
                'open tg')):
            app.open_telegram()

        # Take Note
        elif any(phrase in query for phrase in (
                'take note',
                'make note',
                'write note',
                'note this',
                'note down',
                'note')):
            notes_module.write_note()

        # Tell Story
        elif any(phrase in query for phrase in (
                'read my note',
                'read note',
                'read story',
                'tell story',
                'story')):
            notes_module.read_note()

        # Screenshot
        elif any(phrase in query for phrase in (
                'capture screenshot',
                'take screenshot',
                'screen shot',
                'screenshot',
                'take a ss',
                'take ss',
                'get a ss',
                'get ss')):
            screenshot.screenshot()

        # Sinhala Song
        elif any(phrase in query for phrase in (
                'play sinhala songs',
                'play sinhala song',
                'sinhala songs',
                'sinhala song')):
            songs.play_sinhala_song()

        # English Song
        elif any(phrase in query for phrase in (
                'play english songs',
                'play english song',
                'english songs',
                'english song')):
            songs.play_english_song()

        # Play Song
        elif any(phrase in query for phrase in (
                'play songs',
                'play song',
                'play music',
                'songs',
                'song',
                'music')):
            songs.play_song()

        # Read Remember
        elif any(phrase in query for phrase in (
                'read what you remember',
                'what did you remember',
                'what do you remember',
                'do you remember',
                'read reminder',
                'read remember')):
            remember.read_remember()

        # Remember
        elif any(phrase in query for phrase in (
                'remember this',
                'remember that',
                'save this',
                'take reminder',
                'remember')):
            remember.remember()

        # News
        elif any(phrase in query for phrase in (
                'top headlines',
                'latest news',
                'news headlines',
                'tell me the news',
                'news')):
            news.news()

        # Location
        elif any(phrase in query for phrase in (
                'find location of',
                'show location of',
                'location of',
                "where's",
                'where is',
                'locate')):
            location.location(query)

        # Calculator
        elif any(phrase in query for phrase in (
                'calculate',
                'solve',
                'compute')):
            wolframalphaFunctions.calculate(query)

        # Explain
        elif any(phrase in query for phrase in (
                'tell me about',
                'explain',
                'define',
                'what is',
                'who is')):
            wolframalphaFunctions.explain(query)

        # Sleep
        elif any(phrase in query for phrase in (
                'stop listening',
                'pause listening',
                'stop listen',
                'go to sleep',
                'take a nap',
                'sleep')):
            stop_listening.stopListening()

        # Send WhatsApp Message
        elif any(phrase in query for phrase in (
                'send whatsapp message',
                'whatsapp message',
                'send whatsapp',
                'whatsapp')):
            whatsapp.sendwhatsapp()

        # Natasha (Should be last One)
        elif any(phrase in query for phrase in (
                'hello natasha',
                'hey natasha',
                'hi natasha')):
            basic.greeting(name, real_name)
        elif 'natasha' in query:
            about_natasha.natasha()
