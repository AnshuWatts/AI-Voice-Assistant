import datetime as dt
import commands
import phone_book
import speak


def _load_pywhatkit():
    try:
        import pywhatkit as whats_app
        return whats_app
    except Exception as ex:
        print(f"pywhatkit import failed: {ex}")
        speak.speak("I cannot open WhatsApp right now. Please check your internet and module setup.")
        return None


def sendwhatsapp():
    whats_app = _load_pywhatkit()
    if whats_app is None:
        return

    speak.speak('To whom?')
    receiver = commands.takeCommand()
    receiver = receiver.lower()

    try:
        receiver_number = phone_book.contacts[receiver]
        speak.speak('What should I send?')
        msg = commands.takeCommand()

        hours = int(dt.datetime.now().strftime("%H"))
        min = int(dt.datetime.now().strftime("%M"))
        sec = int(dt.datetime.now().strftime("%S"))

        if sec < 30:
            min = min + 1

            if min == 60:
                hours = hours + 1
                min = 00

                if hours == 24:
                    hours = 00

        else:
            min = min + 2
            if min > 59:
                hours = hours + 1
                min = 00

                if hours == 24:
                    hours = 00

        whats_app.sendwhatmsg(receiver_number, msg, hours, min, 20, True, True)

    except KeyError:
        speak.speak('Can\'t find that contact')
    except Exception:
        speak.speak("I couldn't send the WhatsApp message.")
