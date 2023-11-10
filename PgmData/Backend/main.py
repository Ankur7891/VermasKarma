from flask_cors import CORS
from flask import Flask, request, Response
from model.FaceDetect import  AnalyseImg

from Dialogues.dialogueCut import dialoguesCut as cutVn
from Dialogues.dialogueFull import dialoguesFull as fullVn

import base64

app = Flask(__name__)
cors = CORS(app)

dialogues = cutVn

@app.before_request
def basic_authentication(): 
    if request.method.lower() == 'options': 
        return Response()

@app.route('/mode',methods=['POST'])
def setMode():
    mode = request.get_json()['Mode']
    global dialogues
    match mode:
        case 'Cut': dialogues = cutVn
        case 'Full': dialogues = fullVn
        case _: dialogues = cutVn
    return 'Success'

@app.route('/imageProcessing', methods = ['POST'])
def ProcessImage(): 
    data = request.get_json() 
    image = data["img"].replace("data:image/webp;base64,", "")
    with open(f'./model/image.jpeg', 'wb') as file: 
        file.write(base64.decodebytes(bytes(image, encoding='utf-8')))
    
    emotion = AnalyseImg('./model/image.jpeg')
    result = {'emo': emotion}
    return result

@app.route('/home')
def Home(): 
    _html ='''
    <html>

    <script>
    let myWindow;

    function openWin() {
            myWindow = window.open("http: //localhost: 3000", "", "width=1280, height=720");
    }
    </script>

    <body onload = 'openWin()'>
    </body>
    </html>

    '''
    return _html

@app.route('/dialogue/<int:dialogue_number>')
def dialogue(dialogue_number): 
    global dialogues
    return (dialogues[dialogue_number])

app.run(debug=True, port=5001)
