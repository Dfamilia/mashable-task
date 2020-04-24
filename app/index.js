import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import Navbar from "./components/Navbar";

import "./index.scss";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
      </Fragment>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
