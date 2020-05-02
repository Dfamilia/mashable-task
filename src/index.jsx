import React from 'react';
import ReactDom from 'react-dom';
import Navbar from './components/Navbar';
import './index.scss';

function App() {
  return <Navbar />;
}

ReactDom.render(<App />, document.getElementById('app'));
