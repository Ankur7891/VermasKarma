import './SceneHandler.css';
import Typewriter from './ShowDialogue';
import { useState, useEffect } from 'react';
import ImgCapture from './WebCam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFaceFrown,
  faFaceDizzy,
  faFaceLaughBeam,
  faFaceGrimace,
  faFaceSurprise,
  faFaceSmile,
  faFaceAngry,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';

var Next = 0;
var Alt = 0;

var ScnSrcOg = 'scenes/dreamCrowd1.jpg';
var ChrSrcOg = 'chars/narrator.png';

function SceneHandler({_setState,set_Points}) {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([{}]);
  const [CurrentDialogue, setCurrentDialogue] = useState(0);
  const [Emotional, setEmotional] = useState(false);
  const [EndDState, setEndDState] = useState(false);
  const [captured, setCaptured] = useState(0);
  const [emotionalString, setEmotionalString] = useState('Neutral');

  const [emoNeutral, setEmoNeutral] = useState(0);
  const [emoAngry, setEmoAngry] = useState(0);
  const [emoDisgust, setEmoDisgust] = useState(0);
  const [emoHappy, setEmoHappy] = useState(0);
  const [emoFear, setEmoFear] = useState(0);
  const [emoSurprise, setEmoSurprise] = useState(0);
  const [emoSad, setEmoSad] = useState(0);

  const [on_Skip, setSkip] = useState(false);
  const [D_playState, setD_playState] = useState(false);

  // Keyboard Play with "C" and "Enter"
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Space' || e.key === 'Enter') {
        document.querySelector('.NextButton').click();
      }
    };
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  const handleTypewriterFinish = () => {
    setShowNext(true);
    setSkip(false);
  };

  useEffect(() => {
    fetch('http://localhost:5001/dialogue/' + counter)
      .then((resp) => resp.json())
      .catch((error) => {
        const K = {
          name: 'Error',
          body: 'Error',
          scnImg: 'Error',
          chrImg: 'Error',
        };
        setData(JSON.parse(K));
      })
      .then((dialogue) => {
        setData(dialogue);
        setCurrentDialogue(dialogue.body);
        setEmotional(dialogue.emotional);
        setEndDState(dialogue.emotional);
      });
  }, [counter]);

  Next = data.Next;
  Alt = data.Skip;

  ScnSrcOg = data.scnImg == null ? ScnSrcOg : 'scenes/' + data.scnImg;
  const [ScnSrc, setScnSrc] = useState(ScnSrcOg);
  const [Points, setPoints] = useState(0);

  ChrSrcOg = data.chrImg == null ? ChrSrcOg : 'chars/' + data.chrImg;
  const [ChrSrc, setChrSrc] = useState(ChrSrcOg);

  const [animate_scene, setAnimatorScn] = useState(0);
  const [animate_chars, setAnimatorChr] = useState(0);

  useEffect(() => {
    setAnimatorScn(1);
    setTimeout(() => {
      setScnSrc(ScnSrcOg);
    }, 500);
  }, [ScnSrcOg.toString()]);

  // useEffect(() => {
  //   setAnimatorScn(1);
  // }, [ScnSrcOg.toString().substring(0, 5)]);

  useEffect(() => {
    setAnimatorChr(1);
    setTimeout(() => {
      setChrSrc(ChrSrcOg);
    }, 500);
  }, [ChrSrcOg.toString()]);

  const [showNext, setShowNext] = useState(false);
  const [on_Start, setStart] = useState(true);

  const NextAction = () => {
    console.log(D_playState);
    if (D_playState == true) {
      setSkip(true);
      return null;
    }

    if (Emotional == false && EndDState == false) {    
        if (data.conclude == null)
            setCounter(Next);
        else
        {
            _setState('showPoints');
            set_Points(Points);
        }
    } else if (EndDState == true && Emotional == false) {
      setEmoNeutral(0);
      setEmoAngry(0);
      setEmoDisgust(0);
      setEmoFear(0);
      setEmoSurprise(0);
      setEmoSad(0);
      setEmoHappy(0);

      setCurrentDialogue(data.End);
      setEndDState(false);
    } else {
      if (captured == 0) {
        window.alert(
          "-> It's EMO Time!\n-> Please Click Your Image.\nPress [ Get - MyPic ] Button When READY."
        );
      } else {
        console.log(emotionalString);
        switch (emotionalString) {
          case 'Neutral':
            setPoints(Points + data.Points.Neutral);
            setCurrentDialogue(data.Neutral);

            setEmoNeutral(1);
            break;
          case 'Angry':
            setPoints(Points + data.Points.Neutral);
            setCurrentDialogue(data.Anger);

            setEmoAngry(1);
            break;
          case 'Disgust':
            setPoints(Points + data.Points.Disgust);
            setCurrentDialogue(data.Disgust);

            setEmoDisgust(1);
            break;
          case 'Sad':
            setPoints(Points + data.Points.Sad);
            setCurrentDialogue(data.Sad);

            setEmoSad(1);
            break;
          case 'Happy':
            setPoints(Points + data.Points.Happy);
            setCurrentDialogue(data.Happy);

            setEmoHappy(1);
            break;
          case 'Surprise':
            setPoints(Points + data.Points.Surprise);
            setCurrentDialogue(data.Surprise);

            setEmoSurprise(1);
            break;
          case 'Fear':
            setPoints(Points + data.Points.Fear);
            setCurrentDialogue(data.Fear);

            setEmoFear(1);
            break;
          default:
            console.log('Unknown Emotion');
        }
        setEmotional(false);
      }
    }
    setStart(true);
  };

  const getEmoVal = () => {
    if (Emotional == null) return 0;
    if (Emotional == true) {
      return 1;
    }
    if (
      emoAngry == 1 ||
      emoDisgust == 1 ||
      emoSad == 1 ||
      emoFear == 1 ||
      emoNeutral == 1 ||
      emoSurprise == 1 ||
      emoHappy == 1
    ) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <ImgCapture
        refresh={on_Start}
        setEmotionalString={setEmotionalString}
        setCapture={setCaptured}
      />
      <div className="DialogueBox">
        <img
          className="ScnImg"
          src={ScnSrc}
          alt={'Current Scene Not Found'}
          onAnimationEnd={() => setAnimatorScn(0)}
          animate_scene={animate_scene}
        />
        <img
          className="ChrImg"
          src={ChrSrc}
          alt={data.name + ' Not Found'}
          onAnimationEnd={() => setAnimatorChr(0)}
          animate_chars={animate_chars}
        />
        <div className="DialogueBG">
          <div className="NameTag">{data.name}</div>
          <div className="Dialogues">
            <Typewriter
              settingStart={setStart}
              onStart={on_Start}
              onSkip={on_Skip}
              setPlayState={setD_playState}
              text={CurrentDialogue == null ? '' : CurrentDialogue}
              speed={25}
              onFinish={handleTypewriterFinish}
            />
          </div>
          <div className="Next">
            <ul className="Emojis" emoio={getEmoVal()}>
              <li emo={emoHappy}>
                <FontAwesomeIcon title="Happy" icon={faFaceLaughBeam} />
              </li>
              <li emo={emoNeutral}>
                <FontAwesomeIcon title="Neutral" icon={faFaceSmile} />
              </li>
              <li emo={emoSad}>
                <FontAwesomeIcon title="Sad" icon={faFaceFrown} />
              </li>
              <li emo={emoAngry}>
                <FontAwesomeIcon title="Angry" icon={faFaceAngry} />
              </li>
              <li emo={emoSurprise}>
                <FontAwesomeIcon title="Surprise" icon={faFaceSurprise} />
              </li>
              <li emo={emoFear}>
                <FontAwesomeIcon title="Fear" icon={faFaceGrimace} />
              </li>
              <li emo={emoDisgust}>
                <FontAwesomeIcon title="Disgust" icon={faFaceDizzy} />
              </li>
            </ul>
            <button className="NextButton" onClick={NextAction}>
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SceneHandler;
