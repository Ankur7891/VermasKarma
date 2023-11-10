import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './WebCam.css';

const ImgCapture = ({refresh, setEmotionalString, setCapture }) => {
  const webCamRef = useRef(null);
  const [imgSrc, imgCapt] = useState(null);

  const capture = useCallback(() => {
    imgCapt(webCamRef.current.getScreenshot());
    setCapture(1);
  }, [webCamRef]);

  const resetCamera = useCallback(() => {
    imgCapt(null);
    setCapture(0);
  });

  useEffect(() => {
    if (imgSrc != null) {
      fetch(`http://localhost:5001/imageProcessing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ img: imgSrc }),
      })
        .then((response) => response.json())
        .then((response) => setEmotionalString(response.emo))
        .catch((error) => console.log(error));
    }
  }, [imgSrc]);

  useEffect(() => {
    if (refresh == true) {
      resetCamera();
    }
  }, [refresh]);

  // Keyboard Play with "C" and "Enter"
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'c' || e.key === 'C') {
        document.querySelector('.GetPic').click();
      }
    };
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  return (
    <div className="Container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam className="WebCam" ref={webCamRef} mirrored={true} />
      )}
      <button
        className="GetPic"
        onClick={imgSrc != null ? resetCamera : capture}
      >
        Get - MyPic
      </button>
    </div>
  );
};
export default ImgCapture;
