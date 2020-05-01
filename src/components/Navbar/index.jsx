/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment } from 'react';
import {
  FaCaretDown,
  FaUserAlt,
  FaFacebookSquare,
  FaTwitter,
  FaSearch,
} from 'react-icons/fa';

import HoverSearch from '../HoverSearch/index.jsx';
import Loading from '../Loading/index.jsx';


import './style.scss';

function Navbar() {
  // saver input search ref
  let textInput = null;

  // fire focus method when user clicked search menuItem
  const searchHandleClick = () => {
    textInput.focus();
  };

  const onSubmit = (e) => {
    e.preventDefault();
  }

  const isActive = (active) => {
    console.log('active', active);
  }

  const navFetchLinks = [
    'ENTERTAINMENT',
    'CULTURE',
    'TECH',
    'SCIENCE',
    'SOCIAL GOOD',
    'SHOP',
    'MORE',
  ];

  return (
    <ul className="nav">
      <li className="nav__navItem nav__navItem--home">
        <a href="#">Mashable</a>
      </li>

      <li className="nav__navItem pr-10">
        <a href="#">VIDEO</a>
      </li>

      {navFetchLinks.map((item) => (
        <HoverSearch id={item} cls="nav__navItem">
          {(loading, active) => (
            <>
              <a href="#">{item}</a>
              <FaCaretDown className="icons icons__DD" />
              <div className={`navContent ${isActive(active)}`}>
                {loading}
              </div>
            </>
          )}
        </HoverSearch>
      ))}

      <li
        onClick={searchHandleClick}
        className="nav__navItem marginLeftAuto iconsDiv searchBox"
      >
        <FaSearch className="icons icons__panel" />

        <div className="navSearch">
          <form onSubmit={onSubmit}>
            <input type="text" ref={(input) => { textInput = input; }} id="search" />
            <button type="submit">Search</button>
          </form>
        </div>
      </li>

      <li
        className="nav__navItem iconsDiv pr-30"
      >
        <FaFacebookSquare className="icons icons__panel" />
        <FaTwitter className="icons icons__panel ml-30" />
      </li>

      <li
        className="nav__navItem iconsDiv"
      >
        <FaUserAlt className="icons icons__panel " />
      </li>
    </ul>
  );
}

export default Navbar;


/* NOTES:
  --- when we'll use react-router anchor become navLinks
*/
