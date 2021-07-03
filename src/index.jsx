import csv from '@assets/data';
import json from '@assets/json';
import Logo from '@assets/logo';
import xml from '@assets/note';
import Post from '@models/Post';
import React from 'react';
import { render } from 'react-dom';
import './babel';
import './style/load.less';
import './style/load.scss';
import './style/style.css';

const post = new Post("Webpack first post title", Logo);

console.log('JS', post._toString());
console.log('JSON', json);
console.log('XML', xml);
console.log('CSV', csv);
const App = () => {
  return(
    <div>Hello React</div>
  )
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
