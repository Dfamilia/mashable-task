/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, Component } from 'react';
import {
  FaCaretDown,
  FaUserAlt,
  FaFacebookSquare,
  FaTwitter,
  FaSearch,
} from 'react-icons/fa';

// import li from '../li/index.jsx';
import Loading from '../Loading/index.jsx';


import './style.scss';

export default class Navbar extends Component {

  constructor(props) {
    super(props);

    this.textInput = React.createRef();

    this.state = {
      navFetchLinks: [
        'ENTERTAINMENT',
        'CULTURE',
        'TECH',
        'SCIENCE',
        'SOCIAL GOOD',
        'SHOP',
        'MORE',
      ],
      onNav: false,
      onDisplay: false,
      active: 'active',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.searchHandleClick = this.searchHandleClick.bind(this);
    this.isActive = this.isActive.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onNavMouseLeave = this.onNavMouseLeave.bind(this);
    this.onDisplayMouseLeave = this.onDisplayMouseLeave.bind(this);
  }
  // saver input search ref
  // let textInput = null;

  onMouseOver() {
    this.setState({
      onNav: true,
    });
  }

  onNavMouseLeave() {
    console.log('onNavl');

    this.setState({
      onNav: false,
    })

    if (!this.state.onDisplay) {
      this.setState({
        active: '',
      })
    }
  }

  onDisplayMouseLeave() {
    console.log('onNavl');

    this.setState({
      onDisplay: false,
    })

    if (!this.state.onNav) {
      this.setState({
        active: '',
      })
    }
  }

  onSubmit(e) {
    e.preventDefault();
  }

  // fire focus method when user clicked search menuItem
  searchHandleClick() {
    this.textInput.current.focus();
  };

  isActive(active) {
    console.log('active', active);
  }


  render() {
    return (
      <ul className="nav" onMouseLeave={this.onNavMouseLeave}>
        <li className="nav__navItem nav__navItem--home">
          <a href="#">Mashable</a>
        </li>

        <li className="nav__navItem pr-10">
          <a href="#">VIDEO</a>
        </li>

        {this.state.navFetchLinks.map((item) => (
          <li key={item} className="nav__navItem" onMouseEnter={() => this.onMouseOver(item)} >

            <a href="#">{item}</a>
            <FaCaretDown className="icons icons__DD" />
            <div className={`navContent ${this.state.active}`} onMouseLeave={this.onDisplayMouseLeave} >
              {/* {loading} */}
            </div>

          </li>
        ))
        }

        <li
          onClick={this.searchHandleClick}
          className="nav__navItem marginLeftAuto iconsDiv searchBox"
        >
          <FaSearch className="icons icons__panel" />

          <div className="navSearch">
            <form onSubmit={this.onSubmit}>
              <input type="text" ref={this.textInput} id="search" />
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
      </ul >
    );
  }
}


/* NOTES:
  --- when we'll use react-router anchor become navLinks
*/
