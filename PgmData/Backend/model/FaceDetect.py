import cv2
from keras.models import load_model
from keras.utils import img_to_array
import numpy as np

def AnalyseImg(img):

    face_classifier = cv2.CascadeClassifier('./model/haarcascade_frontalface_default.xml')
    classifier = load_model("./model/model.h5")
    emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']

    img = cv2.imread(img)
    frame = img
    emotion = 'Neutral'
    gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray)

    for (x,y,w,h) in faces:
        roi_gray = gray[y:y+h,x:x+w]
        roi_gray = cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)
        if np.sum([roi_gray]) != 0:
            roi = roi_gray.astype('float') / 255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi,axis=0)

            prediction = classifier.predict(roi)[0]
            emotion = emotion_labels[prediction.argmax()]

    if emotion == None:
        return 'Neutral'
    return emotion