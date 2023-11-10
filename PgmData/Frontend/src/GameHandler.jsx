import { useEffect, useState } from 'react';
import HomePage from './HomePage';
import Navbar from './Navbar';
import SceneHandler from './SceneHandler';
import ScoreCard from './ScoreCard';


const Sound = (ringer) => {
  const audio = new Audio(ringer);
  audio.loop = true;
  audio.play();
  return audio;
};


const GameHandler = () => {
  const [state, setState] = useState('mainMenu');
  const [renderBody, setBody] = useState(0);
  const [Points, setPoints] = useState(0);

  useEffect(() => {
    switch (state) {
      case 'mainMenu':
      Sound('./others/game.mp3');
        setBody(
          <div>
            <HomePage _setState={setState} />
          </div>
        );
        break;
      case 'mainGame':
      Sound('./others/game.mp3');
        setBody(
          <div>
            <Navbar />
            <SceneHandler _setState={setState} set_Points={setPoints} />
          </div>
        );
        break;
      case 'showPoints':
      Sound('./others/game.mp3');
        setBody(<ScoreCard score={Points} />);
    }
  }, [state]);
  return renderBody;
};
export default GameHandler;