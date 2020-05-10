/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import {
  FaCaretDown,
  FaUserAlt,
  FaFacebookSquare,
  FaTwitter,
  FaSearch,
} from 'react-icons/fa';

import Card from '../Card';

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
      activeItem: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.searchHandleClick = this.searchHandleClick.bind(this);
    this.isActive = this.isActive.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onNavMouseLeave = this.onNavMouseLeave.bind(this);
    this.onDisplayMouseLeave = this.onDisplayMouseLeave.bind(this);
  }

  onMouseEnter(item) {
    this.setState({
      onNav: true,
      activeItem: item,

    });
  }

  onNavMouseLeave() {
    this.setState({
      onNav: false,
    });
  }

  onDisplayMouseLeave() {
    this.setState({
      onDisplay: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onSubmit(e) {
    e.preventDefault();
  }

  // fire focus method when user clicked search menuItem
  searchHandleClick() {
    this.textInput.current.focus();
  }

  isActive(item) {
    const { activeItem, onNav, onDisplay } = this.state;
    if (item === activeItem && (onNav || onDisplay)) return true;
    return false;
  }

  render() {
    const { navFetchLinks } = this.state;
    return (
      <ul className="nav" onMouseLeave={this.onNavMouseLeave}>
        <li className="nav__navItem nav__navItem--home">
          <a href="#">Mashable</a>
        </li>

        <li className="nav__navItem pr-10">
          <a href="#">VIDEO</a>
        </li>

        {navFetchLinks.map((item) => (
          <li key={item} className={`nav__navItem ${this.isActive(item) ? 'active' : ''}`} onMouseEnter={() => this.onMouseEnter(item)}>

            <a href="#">{item}</a>
            <FaCaretDown className="icons icons__DD" />
            <div className={`subMenu ${this.isActive(item) ? 'open' : ''}`}>
              {(item === 'SHOP' || item === 'MORE') ?
                (
                  <>
                    <div className="container">
                      <a href='#'>Title</a>
                      <ul>
                        <li>Task 1</li>
                        <li>Task 2</li>
                        <li>Task 3</li>
                        <li>Task 4</li>
                        <li>Task 1</li>
                        <li>Task 2</li>
                        <li>Task 3</li>
                        <li>Task 4</li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="panel__left">
                      <ul className='side__list'>
                        <li>Task 1</li>
                        <li>Task 2</li>
                        <li>Task 3</li>
                        <li>Task 4</li>
                      </ul>
                    </div>
                    <div className="panel__right">
                      <Card title="Task 1" avatar="http://placekitten.com/200/300" description='On this one, the sub-menu items set, should contain something to notice in the front-end which type of layout should be used to render.' />
                      <Card title="Task 2" avatar="http://placekitten.com/200/300" description='On this one, the sub-menu items set, should contain something to notice in the front-end which type of layout should be used to render.' />
                      <Card title="Task 3" avatar="http://placekitten.com/200/300" description='On this one, the sub-menu items set, should contain something to notice in the front-end which type of layout should be used to render.' />
                      <Card title="Task 4" avatar="http://placekitten.com/200/300" description='On this one, the sub-menu items set, should contain something to notice in the front-end which type of layout should be used to render.' />
                      <Card title="Task 5" avatar="http://placekitten.com/200/300" description='On this one, the sub-menu items set, should contain something to notice in the front-end which type of layout should be used to render.' />
                    </div>
                  </>
                )}
            </div>
          </li>
        ))}

        <li
          onClick={this.searchHandleClick}
          className={`nav__navItem iconsDiv marginLeftAuto ${this.isActive('search') ? 'active' : ''}`}
          onMouseEnter={() => this.onMouseEnter('search')}
        >
          <FaSearch className="icons icons__panel icons__search" />

          <div className={`navSearch ${this.isActive('search') ? 'open' : ''}`}>
            <form onSubmit={this.onSubmit}>
              <input type="text" ref={this.textInput} id="search" />
              <button type="submit">Search</button>
            </form>
          </div>
        </li>

        <li
          className={`nav__navItem iconsDiv pr-30 ${this.isActive('follow') ? 'active' : ''}`} onMouseEnter={() => this.onMouseEnter('follow')}
        >
          <FaFacebookSquare className="icons icons__panel" />
          <FaTwitter className="icons icons__panel ml-30" />
          <div className={`follow_submenu ${this.isActive('follow') ? 'open' : ''}`}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Nesciunt reprehenderit quos ipsum aliquid officia consequatur
            aut perferendis id eum! Enim delectus id natus commodi
            ad deserunt exercitationem maxime fugiat laudantium!
          </div>
        </li>

        <li
          className={`nav__navItem iconsDiv ${this.isActive('account') ? 'active' : ''}`} onMouseEnter={() => this.onMouseEnter('account')}
        >
          <FaUserAlt className="icons icons__panel " />
        </li>
      </ul>
    );
  }
}



/* NOTES:
  --- when we'll use react-router anchor become navLinks

  --- que quiero:
1- que cuando haga hover, renderize un loading,
  (despues: busque los datos del menuitem seleccionado y renderize)

2- que cambie el stylo cuando obtenga el dato o el loadin y muestre el div con los datos

3- que el div desaparesca cuando quite el hover
(el div estara dentro del menuItem para que mantenga el hover desde el  parent)

*/
