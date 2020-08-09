import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Fragment,
} from 'react';
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

  // verify and return data if this category data was previous fetched
  const getItemFromListContent = (category, list = []) => list.find(
    (item) => item.navItem === category && item,
  );
  // verify and return data if this navItem data was previous fetched
  const getItemFromSideLinksContent = (navItem, list = []) => list.find(
    (item) => item.navItem === navItem && item,
  );

  const fetchData = async (source, isNavLinks = false) => {
    if (isNavLinks) {
      const requestResult = await fetch('http://localhost:9000/menu-items');
      return requestResult.json();
    }
    const response = await fetch(`http://localhost:9000/sub-menu-items?menu=${source}`);
    return response.json();
  };

  // fetch data by category
  const getSubMenuItemsByCategories = async (categories = []) => Promise.all(
    categories.map(async (category) => {
      const savedItem = getItemFromListContent(category, listContent);
      if (!savedItem) {
        const jsonData = await fetchData(category);
        return Promise.resolve({ navItem: category, data: jsonData.result });
      }
      return Promise.resolve(savedItem);
    }),
  );

  const hoverSearchData = async (navItem, list) => {
    const savedItem = await getItemFromSideLinksContent(navItem, list);
    if (!savedItem) {
      const subMenuItems = await fetchData(navItem);
      const newItem = { navItem, data: subMenuItems.result };

      setSideLinksContent((currentSideLinksContent) => [
        ...currentSideLinksContent,
        newItem,
      ]);
    }
    setSideActiveItem(navItem);
  };

  // on load fetch all menu links
  useEffect(() => {
    const getMenuItems = async () => {
      const menuItems = await fetchData(null, true);

      // concat all category items of ddl navLinks
      const categories = menuItems.reduce((prev, item) => {
        if (item.type === 'ddl') {
          return prev.concat(item.category);
        }
        return prev;
      }, []);
      const subMenuItems = await getSubMenuItemsByCategories([...new Set(categories)]);
      setNavLinks(menuItems);
      // eslint-disable-next-line no-shadow
      setListContent(listContent.concat(subMenuItems));
    };
    getMenuItems();
  }, []);

  const onMouseEnter = (itemName, search = false, list = []) => {
    if (search) {
      hoverSearchData(itemName, list);
    }
    setOnNav(true);
    setActiveItem(itemName);
  };

  const isActive = (item) => {
    const localItem = item === 'SOCIAL GOOD' ? 'social' : item;
    return localItem === activeItem && onNav;
  };

  const onMouseLeave = useCallback(() => {
    setOnNav(false);
  }, []);

  const onSubmit = useCallback((e) => e.preventDefault(), []);

  // fire focus method when user clicked search menuItem
  const searchHandleClick = useCallback(() => textInputRef.current.focus(), []);

  const dataContent = useCallback(
    getItemFromSideLinksContent(sideActiveItem, sideLinksContent),
    [sideActiveItem],
  );

  return (
    <ul className="nav" onMouseLeave={onMouseLeave}>
      {navLinks.map((item) => (
        <Fragment key={uniqid()}>
          {item.type === 'home' && (
            <li key={item.name} className="nav__navItem nav__navItem--home">
              <a href="/">{item.name}</a>
            </li>
          )}

          {item.type === 'none' && (
            <li key={item.name} className="nav__navItem pr-10">
              <a href="/">{item.name}</a>
            </li>
          )}

          {item.type === 'dd' && (
            <li
              key={item.name}
              className={`nav__navItem ${isActive(item.name) ? 'active' : ''}`}
              onMouseEnter={() => onMouseEnter(
                item.name === 'SOCIAL GOOD' ? 'social' : item.name,
                true,
                sideLinksContent,
              )}
            >
              <a href="/">{item.name}</a>
              <FaCaretDown className="icons icons__DD" />
              <div className={`subMenu ${isActive(item.name) ? 'open' : ''}`}>
                <div className="panel__left">
                  <ul className="side__list">
                    {item.category && item.category.map((sideNavLinkName, i) => (
                      <li
                        key={sideNavLinkName}
                        onMouseEnter={() => hoverSearchData(sideNavLinkName, sideLinksContent)}
                        className="side__list__links"
                      >
                        {i === 0 ? `All ${sideNavLinkName}` : sideNavLinkName}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="panel__right">
                  {dataContent ? (
                    dataContent.data.map((sideNavContent) => (
                      <Card
                        key={uniqid()}
                        title={`${sideNavContent.place_name}`}
                        avatar={`https://robohash.org/${sideNavContent.event_id}`}
                        description={`${sideNavContent.name}`}
                      />
                    ))
                  )
                    : (
                      <Loading />
                    )}
                </div>
              </div>
            </li>
          )}

          {item.type === 'ddl' && (
            <li
              key={item.name}
              className={`nav__navItem ${isActive(item.name) ? 'active' : ''}`}
              onMouseEnter={() => onMouseEnter(item.name)}
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
                            key={`${content.navItem}`}
                            className="header"
                          >
                            <a href="/">{content.navItem}</a>
                          </li>
                          {
                            content.data && content.data.map((subContent, i) => i <= 5 && (
                              <li key={uniqid()}>
                                <a href="/">{subContent.name}</a>
                              </li>
                            ))
                          }
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
        className={`nav__navItem iconsDiv marginLeftAuto ${isActive('search') ? 'active' : ''}`}
        onClick={searchHandleClick}
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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt reprehenderit quos
          ipsum aliquid officia consequatur aut perferendis id eum! Enim delectus id natus commodi
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
