import React, { useState, useRef, useEffect, useCallback, Fragment } from 'react';
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

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('');
  const [listContent, setListContent] = useState([]);
  const [navLinks, setNavLinks] = useState([]);
  const [onNav, setOnNav] = useState(false);
  const [sideActiveItem, setSideActiveItem] = useState('');
  const [sideLinksContent, setSideLinksContent] = useState([]);

  const textInputRef = useRef(null);

  const fetchData = useCallback(async (navItem, isListContent) => {
    const requestData = await fetch(`http://localhost:9000/sub-menu-items?menu=${navItem}`);
    const subMenuItems = await requestData.json();

    const newItem = { sideActiveItem, data: subMenuItems.result };

    if (isListContent) {
      setListContent([
        ...listContent,
        newItem,
      ]);
    } else {
      setSideLinksContent([
        ...sideLinksContent,
        newItem,
      ]);
    }
  }, [sideLinksContent, listContent]);

  useEffect(() => {
    const getMenuItems = async () => {
      const requestResult = await fetch('http://localhost:9000/menu-items');
      const menuItems = await requestResult.json();
      setNavLinks(menuItems);
      menuItems.forEach(item => {
        if (item.type === 'ddl') {
          fetchData(item, true);
        }
      });
    };
    getMenuItems();
  }, []);

  const savedContent = useCallback((navItem, isListContent) => {
    const fetchedList = isListContent ? listContent : sideLinksContent;
    return fetchedList.find((item) => item.sideActiveItem === navItem);
  }, [listContent, sideLinksContent]);

  const hoverSearch = useCallback((navItem, isListContent, subContent = []) => {
    if (isListContent) {
      subContent.forEach((item) => {
        if (!savedContent(item, true)) {
          fetchData(item, true);
        }
      });
    } else if (!savedContent(navItem)) {
      fetchData(navItem);
    }
    setSideActiveItem(navItem);
  }, []);

  const onMouseEnter = useCallback((item, name, isListContent, subContent) => {
    return () => {
      setActiveItem(item);
      setOnNav(true);

      if (name) {
        hoverSearch(name, isListContent, subContent);
      }
    };
  }, []);

  const onMouseLeave = useCallback(() => {
    setOnNav(false);
  }, []);


  const onSubmit = useCallback((e) => e.preventDefault(), []);

  // fire focus method when user clicked search menuItem
  const searchHandleClick = useCallback(() => textInputRef.current.focus(), []);

  const isActive = useCallback((item) => item === activeItem && onNav, [activeItem, onNav]);

  const dataContent = savedContent(sideActiveItem);

  return (
    <ul className="nav" onMouseLeave={onMouseLeave}>
      {navLinks.map((item) => (
        <Fragment key={uniqid()}>
          {item.type === 'home' && (
            <li
              key={item.name}
              className="nav__navItem nav__navItem--home"
            >
              <a href="/">{item.name}</a>
            </li>
          )}

          {item.type === 'none' && (
            <li
              key={item.name}
              className="nav__navItem pr-10"
            >
              <a href="/">{item.name}</a>
            </li>
          )}

          {item.type === 'dd' && (
            <li
              key={item.name}
              className={`nav__navItem ${isActive(item.name) ? 'active' : ''}`}
              onMouseEnter={onMouseEnter(item.name, item.name === 'SOCIAL GOOD' ? 'social' : item.name.toLowerCase())}
            >
              <a href="/">{item.name}</a>
              <FaCaretDown className="icons icons__DD" />
              <div className={`subMenu ${isActive(item.name) ? 'open' : ''}`}>
                <div className="panel__left">
                  <ul className="side__list">
                    {item.category && item.category.map((sideNavLinkName, i) => (
                      <li
                        key={sideNavLinkName}
                        onMouseOver={() => hoverSearch(sideNavLinkName.toLowerCase(), true)}
                        onFocus={() => hoverSearch(sideNavLinkName.toLowerCase(), true)}
                        className="side__list__links"
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
              className={`nav__navItem ${isActive(item.name) ? 'active' : ''}`}
              onMouseEnter={onMouseEnter(item.name, item.name, true, item.category)}
            >
              <a href="/">{item.name}</a>

              <FaCaretDown className="icons icons__DD" />

              <div className={`subMenu ${isActive(item.name) ? 'open' : ''}`}>
                <div className="container">
                  <ul className="colums">
                    {listContent && listContent.map((content) => (
                      <li key={uniqid()}>
                        <ul className="colums-list">
                          <li
                            key={`${content.sideActiveItem}`}
                            className="header"
                          >
                            <a href="/">{content.sideActiveItem}</a>
                          </li>
                          <pre>
                            {JSON.stringify(content)}
                          </pre>
                          {/* {content.data && content.data.map((subContent, i) => i <= 5 && (
                            <li key={uniqid()}>
                              <a href="/">{subContent.name}</a>
                            </li>
                          ))} */}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          )}
        </Fragment>
      ))}

      <li
        onClick={searchHandleClick}
        className={`nav__navItem iconsDiv marginLeftAuto ${isActive('search') ? 'active' : ''}`}
        onMouseEnter={onMouseEnter('search')}
      >
        <FaSearch className="icons icons__panel icons__search" />

        <div className={`navSearch ${isActive('search') ? 'open' : ''}`}>
          <form onSubmit={onSubmit}>
            <input type="text" ref={textInputRef} id="search" />
            <button type="submit">Search</button>
          </form>
        </div>
      </li>

      <li
        className={`nav__navItem iconsDiv pr-30 ${isActive('follow') ? 'active' : ''}`}
        onMouseEnter={onMouseEnter('follow')}
      >
        <FaFacebookSquare className="icons icons__panel" />
        <FaTwitter className="icons icons__panel ml-30" />
        <div className={`follow_submenu ${isActive('follow') ? 'open' : ''}`}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Nesciunt reprehenderit quos ipsum aliquid officia consequatur
          aut perferendis id eum! Enim delectus id natus commodi
          ad deserunt exercitationem maxime fugiat laudantium!
        </div>
      </li>

      <li
        className={`nav__navItem iconsDiv ${isActive('account') ? 'active' : ''}`}
        onMouseEnter={onMouseEnter('account')}
      >
        <FaUserAlt className="icons icons__panel" />
      </li>
    </ul>
  );
};

export default Navbar;
