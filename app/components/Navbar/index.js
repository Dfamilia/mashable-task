import React, { Component, Fragment } from "react";
import {
  FaCaretDown,
  FaUserAlt,
  FaFacebookSquare,
  FaTwitter,
  FaSearch,
} from "react-icons/fa";
import HoverSearch from "../HoverSearch";
import Loading from "../Loading";

import "./style.scss";

export default class Navbar extends Component {
  render() {
    return (
      <ul className="nav">
        <li className="nav__navItem nav__navItem--home">
          <a href="#">Mashable</a>
        </li>
        <li className="nav__navItem">
          <a href="#">VIDEO</a>
        </li>
        <HoverSearch cls="nav__navItem">
          {(searching, onMouseOut) => {
            return (
              <Fragment>
                <a href="#">
                  ENTERTAINMENT
                  <FaCaretDown className="DDicons" />
                </a>
                {searching === true && (
                  // query component
                  <div className="navContent" onMouseOut={onMouseOut}>
                    <Loading />
                  </div>
                )}
              </Fragment>
            );
          }}
        </HoverSearch>
        <HoverSearch cls="nav__navItem">
          {(searching, onMouseOut) => {
            return (
              <Fragment>
                <a href="#">
                  CULTURE
                  <FaCaretDown className="DDicons" />
                </a>
                {searching === true && (
                  // query component
                  <div className="navContent" onMouseOut={onMouseOut}>
                    <Loading />
                  </div>
                )}
              </Fragment>
            );
          }}
        </HoverSearch>
        <HoverSearch cls="nav__navItem">
          {(searching, onMouseOut) => {
            return (
              <Fragment>
                <a href="#">
                  TECH
                  <FaCaretDown className="DDicons" />
                </a>
                {searching === true && (
                  <div className="navContent" onMouseOut={onMouseOut}>
                    <Loading />
                  </div>
                )}
              </Fragment>
            );
          }}
        </HoverSearch>
        <HoverSearch cls="nav__navItem">
          {(searching, onMouseOut) => {
            return (
              <Fragment>
                <a href="#">
                  SCIENCE
                  <FaCaretDown className="DDicons" />
                </a>
                {searching === true && (
                  <div className="navContent" onMouseOut={onMouseOut}>
                    <Loading />
                  </div>
                )}
              </Fragment>
            );
          }}
        </HoverSearch>
        <HoverSearch cls="nav__navItem">
          {(searching, onMouseOut) => {
            return (
              <Fragment>
                <a href="#">
                  SOCIAL GOOD
                  <FaCaretDown className="DDicons" />
                </a>
                {searching === true && (
                  <div className="navContent" onMouseOut={onMouseOut}>
                    <Loading />
                  </div>
                )}
              </Fragment>
            );
          }}
        </HoverSearch>
        <HoverSearch cls="nav__navItem">
          {(searching, onMouseOut) => {
            return (
              <Fragment>
                <a href="#">
                  SHOP
                  <FaCaretDown className="DDicons" />
                </a>
                {searching === true && (
                  <div className="navContent" onMouseOut={onMouseOut}>
                    <Loading />
                  </div>
                )}
              </Fragment>
            );
          }}
        </HoverSearch>
        <HoverSearch cls="nav__navItem">
          {(searching, onMouseOut) => {
            return (
              <Fragment>
                <a href="#">
                  MORE
                  <FaCaretDown className="DDicons" />
                </a>
                {searching === true && (
                  <div className="navContent" onMouseOut={onMouseOut}>
                    <Loading />
                  </div>
                )}
              </Fragment>
            );
          }}
        </HoverSearch>
        <HoverSearch cls="nav__navItem marginLeftAuto">
          {(searching, onMouseOut) => {
            return (
              <Fragment>
                <a href="#">
                  <FaSearch className="DDicons" />
                </a>
                {searching === true && (
                  <div className="navSearch" onMouseOut={onMouseOut}>
                    <form>
                      <input type="text" placeholder="Search" />
                      <button type="submit">Search</button>
                    </form>
                  </div>
                )}
              </Fragment>
            );
          }}
        </HoverSearch>
        <HoverSearch cls="nav__navItem">
          {(searching, onMouseOut) => {
            return (
              <Fragment>
                <a href="#">
                  <FaFacebookSquare className="DDicons" />
                  <FaTwitter className="DDicons ml-30" />
                </a>
                {searching === true && (
                  <div className="navContent" onMouseOut={onMouseOut}>
                    <Loading />
                  </div>
                )}
              </Fragment>
            );
          }}
        </HoverSearch>
        <HoverSearch cls="nav__navItem">
          {(searching, onMouseOut) => {
            return (
              <Fragment>
                <a href="#">
                  <FaUserAlt className="DDicons ml-30" />
                </a>
                {searching === true && (
                  <div className="navContent" onMouseOut={onMouseOut}>
                    <Loading />
                  </div>
                )}
              </Fragment>
            );
          }}
        </HoverSearch>
      </ul>
    );
  }
}
