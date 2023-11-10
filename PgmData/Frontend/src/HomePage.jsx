import React from 'react';
import { useState,useEffect } from 'react';
import './HomePage.css';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomePage = ({_setState}) => {
    const [mode, setMode] = useState('Cut');

      const [showAbout, setAbout] = useState(false);
      const [showStart, setShowStart] = useState(false);

    const handleStart = () => {
        setShowStart(true);
    };

    const handleMode = () => {
        switch(mode){
            case 'Cut':
                setMode('Full');
                break;
            case 'Full':
                setMode('Cut');
                break;
        }
    };



    useEffect(() => {
        fetch(`http://localhost:5001/mode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Mode: mode }),
        })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    }, [mode]);



  const handleAbout = () => {
    setAbout(true);
  };

  return (
    <div className="HomeBase">
      <div className="game-container">
        <div className="symbol">
          <img
            src="others/VsK_RPG_Py.png"
            alt="Logo Not Found"
            title="Verma's Karma"
          />
        </div>

        {!showStart && !showAbout ? (
          <div className="menu">
            <button className="start-btn" onClick={handleStart}>
              Start
            </button>
            <button className="mode-btn" onClick={handleMode}>
              Mode &lt; {mode} &gt;
            </button>
            <button className="about-btn" onClick={handleAbout}>
              About
            </button>
          </div>
        ) : (
          showStart && (
            <div className="infoBox">
              <div className="info">
                -&gt; You are Mr. James Verma, Currently the Temporary CEO of X.
                X's Former CEO has Resigned for Personal Reasons and now its
                your time to shine . . .
                <br />
                <br />
                -&gt; You have to Showcase your Potential at your Upcoming
                Company Summit to your Co-Workers and to the Chief Guest Mr.
                Phunsuk Wangdu, with their Support you can Become the Undisputed
                CEO and Rise to New Heights!
                <br />
                <br />
                <hr />
                <br />
                NOTE: You can Play with the Following Functionalities:
                <br />
                -&gt; Next / Skip Button (&gt;) to Proceed to Next Scene / Fast
                Forward - Keys: 'Enter'
                <br />
                -&gt; Get-MyPic Button to Capture Your Face for Emotion
                Detection - Keys: 'c' / 'C'
                <br />
                <br />
                <div className="Btns">
                  <button
                    className="back-btn"
                    onClick={() => window.location.reload()}
                  >
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                  </button>{' '}
                  <button
                    className="play-btn"
                    onClick={() => _setState('mainGame')}
                  >
                    PLAY !
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {showAbout && (
          <div className="infoBox">
            <div className="info" style={{ fontSize: '16px'}}>
              <center style={{ fontSize: '25px', color: 'lightyellow' }}>
                ABOUT
              </center>
              <hr />
              &nbsp; &nbsp; &nbsp; &nbsp; VERMA's KARMA is an interactive,
              choice-based storytelling game that puts you in the shoes of Mr.
              James Verma, who finds himself in a pivotal moment—aiming to prove
              himself as the interim CEO of a company amidst challenges, rivals,
              and a potential internal coup. The game navigates Verma's journey
              through a series of critical decisions where your choices shape
              his responses and influence the outcome of the story.
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; Each decision you make molds Verma's
              interactions with colleagues, friends, and adversaries, ultimately
              impacting his success in the company summit. Whether it's handling
              late arrivals, facing opposition, or dealing with unexpected
              threats to his position, the game tests your decision-making
              skills as you guide Verma through the twists and turns of
              corporate life.
              <br />
              <hr />
              <div className="Btns" id="Prev">
                <button
                  className="back-btn"
                  onClick={() => window.location.reload()}
                >
                  <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
