import React from 'react';
import {
  FaCaretDown,
  FaUserAlt,
  FaFacebookSquare,
  FaTwitter,
  FaSearch,
} from 'react-icons/fa';

import './style.scss';

function Navbar() {
  let textInput = null;

  const searchHandleClick = () => {
    textInput.focus();
  };

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
        <li key={item} className="nav__navItem">
          <a href="#">{item}</a>
          <FaCaretDown className="icons icons__DD" />
        </li>
      ))}

      <li
        onClick={searchHandleClick}
        className="nav__navItem marginLeftAuto iconsDiv searchBox"
        role='menuitem'
      >
        <FaSearch className="icons icons__panel" />

        <div className="navSearch">
          <form>
            <input type="text" ref={(input) => { textInput = input; }} id="search" />
            <button type="submit">Search</button>
          </form>
        </div>
      </li>

      <li
        className="nav__navItem iconsDiv pr-30"
      // onMouseOver={() => this.onMouseOver('follow')}
      // onMouseOut={() => this.onMouseOut('follow')}
      >
        <FaFacebookSquare className="icons icons__panel" />
        <FaTwitter className="icons icons__panel ml-30" />
        {/* <div className="navContent" onMouseOut={this.onMouseOut}>
            <Loading />
          </div> */}
      </li>

      <li
        className="nav__navItem iconsDiv"
      // onMouseOver={() => this.onMouseOver('account')}
      // onMouseOut={() => this.onMouseOut('account')}
      >
        <FaUserAlt className="icons icons__panel " />

        {/* <div className="navContent" onMouseOut={this.onMouseOut}>
            <Loading />
          </div> */}
      </li>
    </ul>
  );
}

export default Navbar;
