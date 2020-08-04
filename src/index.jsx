import React from 'react';
import ReactDom from 'react-dom';
import Navbar from './components/Navbar';
import './index.scss';

const App = () => <Navbar />;

ReactDom.render(<App />, document.getElementById('app'));
