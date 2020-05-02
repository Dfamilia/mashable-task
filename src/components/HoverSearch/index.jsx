/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HoverSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: false,
      active: false,
    };

    // this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      loading: false,
      active: false,
    });
  }

  onMouseOver() {
    setTimeout(() => {
      this.setState({
        loading: true,
        active: true,
      });
    }, 1000);
  }

  // onMouseOut() {
  //   this.setState({
  //     hovering: false,
  //   });
  // }

  render() {
    const { cls, children, id } = this.props;
    const { loading, active } = this.state;

    return (
      <li key={id} className={cls} onMouseOver={this.onMouseOver}>
        {children(loading, active)}
      </li>
    );
  }
}

HoverSearch.propTypes = {
  cls: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  // children: PropTypes.node,
};

// HoverSearch.defaultProps = {
//   children: null,
// };


/* que quiero:
1- que cuando haga hover, renderize un loading,
  (despues: busque los datos del menuitem seleccionado y renderize)

2- que cambie el stylo cuando obtenga el dato o el loadin y muestre el div con los datos

3- que el div desaparesca cuando quite el hover
(el div estara dentro del menuItem para que mantenga el hover desde el  parent)

*/
