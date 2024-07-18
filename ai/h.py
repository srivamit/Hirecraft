import cv2
import pygame

# Initialize pygame
pygame.mixer.init()

# Load the alarm sound
pygame.mixer.music.load("ALM.mp3")

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

cap = cv2.VideoCapture(0)
while True:
    _, img = cap.read()

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    # Check if no face is detected
    if len(faces) == 0:
        # Draw a red rectangle around the entire screen
        cv2.rectangle(img, (0, 0), (img.shape[1], img.shape[0]), (0, 0, 255), 2)
        # Play the alarm sound
        pygame.mixer.music.play()
    else:
        # Stop the alarm if it's playing
        pygame.mixer.music.stop()
        # Draw rectangles around detected faces
        for (x, y, w, h) in faces:
            cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)

    cv2.imshow('img', img)

    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()
