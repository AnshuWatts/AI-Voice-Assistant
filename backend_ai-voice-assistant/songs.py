import os
import random
import speak
import editables

def _play_random_from(path, folder_name):
    if not os.path.exists(path):
        speak.speak(f"The {folder_name} folder does not exist.")
        return

    music = [file for file in os.listdir(path) if file.endswith(('.mp3', '.wav'))]

    if not music:
        speak.speak(f"No songs found in the {folder_name} folder.")
        return

    song = random.choice(music)
    song_path = os.path.join(path, song)

    speak.speak(f"Playing {song}")
    os.startfile(song_path)


def play_song():
    _play_random_from(editables.songs, "songs")


def play_english_song():
    _play_random_from(editables.english_songs, "English songs")


def play_sinhala_song():
    _play_random_from(editables.sinhala_songs, "Sinhala songs")

# import os
# import editables
# import random


# def play_song():
#     music = os.listdir(editables.songs)
#     no = random.randint(0, editables.songs_count - 1)
#     os.startfile(os.path.join(editables.songs, music[no]))


# def play_english_song():
#     music = os.listdir(editables.english_songs)
#     no = random.randint(0, editables.english_songs_count - 1)
#     os.startfile(os.path.join(editables.english_songs, music[no]))


# def play_sinhala_song():
#     music = os.listdir(editables.sinhala_songs)
#     no = random.randint(0, editables.sinhala_songs_count - 1)
#     os.startfile(os.path.join(editables.sinhala_songs, music[no]))
