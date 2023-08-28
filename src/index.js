import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import backgroundImage from './assets/images/background.jpg'
const rootEle = document.getElementById('root')
rootEle.style.background = `url(${backgroundImage})`
rootEle.style.backgroundAttachment = 'fixed'
rootEle.style.backgroundSize = 'cover'
const root = ReactDOM.createRoot(rootEle);
root.render(
  <App />
);

