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
import uniqid from 'uniqid';

import Card from '../Card';
import Loading from '../Loading';

import './style.scss';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();

    this.state = {
      navLinks: [],
      sideLinksContent: [],
      onNav: false,
      activeItem: '',
      sideActiveItem: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.searchHandleClick = this.searchHandleClick.bind(this);
    this.hoverSearch = this.hoverSearch.bind(this);
    this.isActive = this.isActive.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onNavMouseLeave = this.onNavMouseLeave.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:9000/menu-items')
      .then((fetchLinksResp) => fetchLinksResp.json())
      .then((fetchLinksResp) => this.setState({ navLinks: fetchLinksResp }));
  }

  // componentDidUpdate(none, prevState) {
  //   const { activeItem } = this.state;
  //   if (activeItem !== prevState.activeItem) {
  //     this.setState({ sideLinksContent: [] });
  //   }
  // }

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

  // eslint-disable-next-line class-methods-use-this
  onSubmit(e) {
    e.preventDefault();
  }

  // fire focus method when user clicked search menuItem
  searchHandleClick() {
    this.textInput.current.focus();
  }

  hoverSearch(sideActiveItem = '') {
    this.setState({ sideActiveItem });


    if (!this.saveContent(sideActiveItem)) {
      fetch(`http://localhost:9000/sub-menu-items?${new URLSearchParams({
        menu: sideActiveItem,
      })}`)
        .then((fetchResult) => fetchResult.json())
        .then((fetchResult) => (
          this.setState((state) => (
            {
              sideLinksContent:
                [
                  ...state.sideLinksContent,
                  { sideActiveItem, data: fetchResult.result },
                ],
            }
          ))
        ));
    }
  }

  saveContent(sideActiveItem) {
    const { sideLinksContent } = this.state;
    return sideLinksContent.find((ele) => ele.sideActiveItem === sideActiveItem);
  }

  isActive(item) {
    const { activeItem, onNav } = this.state;
    return item === activeItem && onNav;
  }

  // /////////////////////render//////////////////////////
  render() {
    const { navLinks, sideActiveItem } = this.state;
    const dataContent = this.saveContent(sideActiveItem);
    console.log('dataContent', dataContent);

    return (
      <ul className="nav" onMouseLeave={this.onNavMouseLeave}>

        {navLinks.map((item) => (
          <>
            {item.type === 'home' && (
              <li
                key={item.name}
                className="nav__navItem nav__navItem--home"
              >
                <a href="#">{item.name}</a>
              </li>
            )}

            {item.type === 'none' && (
              <li
                key={item.name}
                className="nav__navItem pr-10"
              >
                <a href="#">{item.name}</a>
              </li>
            )}

            {item.type === 'dd' && (
              <li
                key={item.name}
                className={`nav__navItem ${this.isActive(item.name) ? 'active' : ''}`}
                onMouseEnter={() => { this.onMouseEnter(item.name); this.hoverSearch(item.name === 'SOCIAL GOOD' ? 'social' : item.name.toLowerCase()); }}
              >
                <a href="#">{item.name}</a>
                <FaCaretDown className="icons icons__DD" />
                <div className={`subMenu ${this.isActive(item.name) ? 'open' : ''}`}>
                  <div className="panel__left">
                    <ul className="side__list">
                      {item.category.map((sideNavLinkName, i) => (
                        <li
                          key={`${sideNavLinkName}`}
                          onMouseOver={() => this.hoverSearch(sideNavLinkName.toLowerCase())}
                          className='side__list__links'
                        >
                          {i === 0 ? `All ${sideNavLinkName}` : sideNavLinkName}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="panel__right">
                    {console.log('datos', dataContent)}
                    {dataContent
                      ? dataContent.data.map((sideNavContent) => (
                        <Card
                          key={uniqid()}
                          title={`${sideNavContent.place_name}`}
                          avatar={`https://robohash.org/${sideNavContent.event_id}`}
                          description={`${sideNavContent.name}`}
                        />
                      )) : <Loading />}
                  </div>
                </div>
              </li>
            )}

            {item.type === 'ddl' && (
              <li
                key={item.name}
                className={`nav__navItem ${this.isActive(item.name) ? 'active' : ''}`}
                onMouseEnter={() => this.onMouseEnter(item.name)}
              >
                <a href="#">{item.name}</a>

                <FaCaretDown className="icons icons__DD" />

                <div className={`subMenu ${this.isActive(item.name) ? 'open' : ''}`}>
                  <div className="container">
                    <ul className="colums">
                      <li>
                        <ul className="colums-list">
                          <li className="header">
                            <a href='#'>Task 2</a>
                          </li>
                          <li>
                            <a href='#'>Task 2asdfasfasfdasdfas</a>
                          </li>
                          <li>
                            <a href='#'>Task 2</a>
                          </li>
                          <li>
                            <a href='#'>Task 2</a>
                          </li>
                          <li>
                            <a href='#'>Task 2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul className="colums-list">
                          <li className="header">
                            <a href='#'>Task 3</a>
                          </li>
                          <li>
                            <a href='#'>Task 2asdfasdfasdfad</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul className="colums-list">
                          <li className="header">
                            <a href='#'>Task 1</a>
                          </li>
                          <li>
                            <a href='#'>Task 2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul className="colums-list">
                          <li className="header">
                            <a href='#'>Task 4</a>
                          </li>
                          <li>
                            <a href='#'>Task 2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul className="colums-list">
                          <li className="header">
                            <a href='#'>Task 1</a>
                          </li>
                          <li>
                            <a href='#'>Task 2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul className="colums-list">
                          <li className="header">
                            <a href='#'>Task 2</a>
                          </li>
                          <li>
                            <a href='#'>Task 2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul className="colums-list">
                          <li className="header">
                            <a href='#'>Task 3</a>
                          </li>
                          <li>
                            <a href='#'>Task 2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul className="colums-list">
                          <li className="header">
                            <a href='#'>Task 4</a>
                          </li>
                          <li>
                            <a href='#'>Task 2</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            )}
          </>
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
          className={`nav__navItem iconsDiv pr-30 ${this.isActive('follow') ? 'active' : ''}`}
          onMouseEnter={() => this.onMouseEnter('follow')}
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
          className={`nav__navItem iconsDiv ${this.isActive('account') ? 'active' : ''}`}
          onMouseEnter={() => this.onMouseEnter('account')}
        >
          <FaUserAlt className="icons icons__panel" />
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
