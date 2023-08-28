import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import backgroundImage from './assets/images/background.jpg'
const rootEle = document.getElementById('root')
const body = document.body
body.style.background = `url(${backgroundImage})`
body.style.backgroundAttachment = 'fixed'
body.style.backgroundSize = 'cover'
const root = ReactDOM.createRoot(rootEle);
root.render(
  <App />
);

