import React, { useState, useEffect, useCallback } from 'react';

const Typewriter = ({ settingStart, onStart, onSkip, setPlayState, text, speed, onFinish }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  const setDisplayNull = useCallback(() => {
    setDisplayedText("");
    setIndex(0);
  });

  useEffect(() => {
    if (onStart == true) {
      setDisplayNull();
        setTimeout(() => {
            settingStart(false);
            setPlayState(true);
        }, 1000);
    }
    if(onSkip)
    {
        setDisplayedText(text);
        setIndex(text.length);
    }    
    const interval = setInterval(() => {
        if (index < text.length) {
            setDisplayedText((prevText) => prevText + text[index]);
            setIndex((prevIndex) => prevIndex + 1);
        } else {
            clearInterval(interval);
                setPlayState(false);
            if (onFinish) onFinish();
        }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onFinish, index]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
