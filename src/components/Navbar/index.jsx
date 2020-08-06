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

  // busca los datos del sub-content
  const fetchData = useCallback(async (navItem, isListContent) => {
    console.log('fetchData', navItem, isListContent)

    const requestData = await fetch(`http://localhost:9000/sub-menu-items?menu=${navItem}`);
    const subMenuItems = await requestData.json();

    const newItem = { navItem, data: subMenuItems.result };

    if (isListContent) {
      console.log('fetchdata2', [...listContent, newItem])
      await setListContent((listContent) => [
        ...listContent,
        newItem,
      ]);
    } else {
      await setSideLinksContent((sideLinksContent) => [
        ...sideLinksContent,
        newItem,
      ]);
    }
  }, [sideLinksContent, listContent]);

  // verifica si el dato existe en cache
  const savedContent = useCallback((navItem, isListContent) => {
    console.log('sc', isListContent);
    const fetchedList = isListContent ? listContent : sideLinksContent;
    const isFechedList = fetchedList.find((item) => item.sideActiveItem === navItem);
    console.log('sc2', isFechedList);
    console.log('sc3', listContent);
    console.log('sc4', sideLinksContent);
    return isFechedList;
  }, [listContent, sideLinksContent]);

  const hoverSearch = useCallback(async (navItem, isListContent, subContent = []) => {
    console.log('hsearch', navItem, isListContent, subContent);

    if (isListContent) {
      for (const item of subContent) {
        if (await !savedContent(item, true)) {
          await fetchData(item, true);
        }
      }
    } else if (!savedContent(navItem)) {
      fetchData(navItem);
    }
    setSideActiveItem(navItem);
  }, []);

  useEffect(() => {
    const getMenuItems = async () => {
      const requestResult = await fetch('http://localhost:9000/menu-items');
      const menuItems = await requestResult.json();
      setNavLinks(menuItems);
      menuItems.forEach((item) => {
        if (item.type === 'ddl') {
          hoverSearch(item.name, true, item.category);
        }
      });
    };
    getMenuItems();
  }, []);

  const onMouseEnter = useCallback((item, name, isListContent, subContent) => {
    console.log('holar', item, name, isListContent, subContent);
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
    <>
      <pre>{JSON.stringify(sideLinksContent)}</pre>
      <pre>{JSON.stringify(navLinks)}</pre>
    </>
  );

  return (
    <ul className="nav" onMouseLeave={onMouseLeave}>
      {console.log('group', navLinks)}

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
              onMouseEnter={() => onMouseEnter(item.name, item.name === 'SOCIAL GOOD' ? 'social' : item.name.toLowerCase())}
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


        </Fragment>
      ))}

      <li
        onClick={searchHandleClick}
        className={`nav__navItem iconsDiv marginLeftAuto ${isActive('search') ? 'active' : ''}`}
        onMouseEnter={() => onMouseEnter('search')}
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
        onMouseEnter={() => onMouseEnter('follow')}
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
        onMouseEnter={() => onMouseEnter('account')}
      >
        <FaUserAlt className="icons icons__panel" />
      </li>
    </ul>
  );
};

export default Navbar;
