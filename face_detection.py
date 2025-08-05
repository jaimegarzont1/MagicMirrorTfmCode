#!/usr/bin/python3

import cv2
import os  
import time
from picamera2 import Picamera2

# Load Haar cascade for face detection
face_detector = cv2.CascadeClassifier("/home/jaimegarzont/Face Recognition/haarcascade_frontalface_default.xml")

cv2.startWindowThread()

# Initialize camera
picam2 = Picamera2()
picam2.configure(picam2.create_preview_configuration(main={"format": 'XRGB8888', "size": (640, 480)}))
picam2.start()

# New output directory for MagicMirror MMM-ImagesPhotos
output_directory = "/home/jaimegarzont/MagicMirror/modules/MMM-ImagesPhotos/uploads"
os.makedirs(output_directory, exist_ok=True)

while True:
    im = picam2.capture_array()
    grey = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    faces = face_detector.detectMultiScale(grey, 1.1, 5)

    for (x, y, w, h) in faces:
        cv2.rectangle(im, (x, y), (x + w, y + h), (0, 255, 0))

        # Save each detected face with timestamp
        timestamp = int(time.time())
        filename = os.path.join(output_directory, f"face_{timestamp}.jpg")
        cv2.imwrite(filename, im[y:y+h, x:x+w])  # Only save face region

    cv2.imshow("Camera", im)
    cv2.waitKey(1)
