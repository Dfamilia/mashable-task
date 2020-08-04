import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

const Card = ({ title, avatar, description }) => {
  const classes = useStyles();

  return (
    <div className={classes.cart}>
      <a href="/">
        <img
          className={classes.avatar}
          src={avatar}
          alt={title}
        />
      </a>
      <a href="/">
        <p className={classes.description}>
          {description}
        </p>
      </a>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
