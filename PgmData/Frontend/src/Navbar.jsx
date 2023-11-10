import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCirclePlay,
  faVolumeUp,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img
          src="others/VsK_RPG_Py.png"
          alt="Logo Not Found"
          title="Verma's Karma"
        />
      </div>
      <ul>
        <li>
          <a href="#" title='No Way Home!'>
            <FontAwesomeIcon icon={faHome} />
          </a>
        </li>
        <li>
          <a href="#" title="You ain't Dr.Strange.">
            <FontAwesomeIcon icon={faCirclePlay} />
          </a>
        </li>
        <li>
          <a href="#" title='Deafening Further.'>
            <FontAwesomeIcon icon={faVolumeUp} />
          </a>
        </li>
        <li>
          <a href="#" title="I am I.">
            <FontAwesomeIcon icon={faInfoCircle} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;