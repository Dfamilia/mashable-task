import React from 'react';
import './styles.scss'

export default function Card({ title, avatar, description }) {
  return (
    <div className="cart">
      <a href='#'><img className="cart__avatar" src={avatar} alt={title} /></a>
      <a href='#'><p className="cart__description">{description}</p></a>
    </div>
  );
}
