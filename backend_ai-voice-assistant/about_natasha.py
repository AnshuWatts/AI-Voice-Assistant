from colorama import Fore, Style
import speak


def say_name():
    print(Fore.GREEN + 'My name is Natasha' + Style.RESET_ALL)
    speak.speak_only('my name is Natasha')


def natasha():
    speak.speak('Yes, I\'m here')


def Jarvish():
    natasha()


# Introduce
def introduce():

    print(Fore.GREEN + """
    I\'m Natasha.
    I am the voice assistant of this computer.
    I can help you to do your works easily using voice commands.
    """ + Style.RESET_ALL)

    speak.speak_only('I\'m Natasha, I am the voice assistant of this computer. I can help you to do your works easily using voice commands. ')
