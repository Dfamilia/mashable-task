import React, { Component, Fragment } from "react";

export default class HoverSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };

    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOver() {
    this.setState({
      hovering: true,
    });
  }

  onMouseOut() {
    this.setState({
      hovering: false,
    });
  }
  render() {
    const { cls } = this.props;
    return (
      <li className={cls} onMouseOver={this.onMouseOver}>
        {this.props.children(this.state.hovering, this.onMouseOut)}
      </li>
    );
  }
}
