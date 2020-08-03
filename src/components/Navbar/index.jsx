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
      activeItem: '',
      listContent: [],
      navLinks: [],
      onNav: false,
      sideActiveItem: '',
      sideLinksContent: [],
    };

    this.fetchData = this.fetchData.bind(this);
    this.hoverSearch = this.hoverSearch.bind(this);
    this.isActive = this.isActive.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onNavMouseLeave = this.onNavMouseLeave.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.searchHandleClick = this.searchHandleClick.bind(this);
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

  hoverSearch(sideActiveItem = null, isListContent = false, subContent = []) {
    this.setState({ sideActiveItem });
    console.log('hoverSearch', sideActiveItem);

    if (!isListContent) {
      if (!this.saveContent(sideActiveItem)) {
        this.fetchData(sideActiveItem);
      }
    } else {
      subContent.forEach((item) => !this.saveContent(item, true) && this.fetchData(item, true));
    }
  }

  fetchData(sideActiveItem = null, isListContent = false) {
    console.log('fetchData', sideActiveItem);
    fetch(`http://localhost:9000/sub-menu-items?${new URLSearchParams({
      menu: sideActiveItem,
    })}`)
      .then((fetchResult) => fetchResult.json())
      .then((fetchResult) => {
        if (!isListContent) {
          this.setState((state) => (
            {
              sideLinksContent:
                [
                  ...state.sideLinksContent,
                  { sideActiveItem, data: fetchResult.result },
                ],
            }
          ));
        } else {
          this.setState((state) => (
            {
              listContent:
                [
                  ...state.listContent,
                  { sideActiveItem, data: fetchResult.result },
                ],
            }
          ));
        }
      });
  }

  saveContent(sideActiveItem, isListContent = false) {
    const { sideLinksContent, listContent } = this.state;
    const fetchedList = isListContent ? listContent : sideLinksContent;
    return fetchedList.find((ele) => ele.sideActiveItem === sideActiveItem);
  }

  isActive(item) {
    const { activeItem, onNav } = this.state;
    return item === activeItem && onNav;
  }

  // /////////////////////render//////////////////////////
  render() {
    const { navLinks, sideActiveItem, listContent } = this.state;
    const dataContent = this.saveContent(sideActiveItem);

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
                onMouseEnter={() => { this.onMouseEnter(item.name); this.hoverSearch(item.name, true, item.category); }}
              >
                <a href="#">{item.name}</a>

                <FaCaretDown className="icons icons__DD" />

                <div className={`subMenu ${this.isActive(item.name) ? 'open' : ''}`}>
                  <div className="container">
                    <ul className="colums">
                      {listContent.map((content) => (
                        <li>
                          <ul className="colums-list">
                            <li
                              key={`${content.sideActiveItem}`}
                              className="header"
                            >
                              <a href='#'>{content.sideActiveItem}</a>
                            </li>
                            {content.data.map((subContent, i) => i <= 5 && (
                              <li key={subContent.lat + i}>
                                <a href='#'>{subContent.name}</a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
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
