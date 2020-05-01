import React, { Component } from 'react';

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'loading',
    };
  }

  componentDidMount() {
    this.setLoading = setInterval(() => {
      this.setState(({ text }) => {
        if (text !== 'loading...') {
          return {
            text: text + '.'
          };
        }
        return {
          text: 'loading',
        };
      });
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.setLoading);
  }

  render() {
    const { text } = this.state;

    return <span>{text}</span>;
  }
}
