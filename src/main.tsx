import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { warmLocaleBundles } from './data/useContent';
import { onIdle } from './utils/idle';
import './index.css';

onIdle(() => {
  warmLocaleBundles();

  // Google Fonts subsets by unicode-range, so the Arabic faces are not fetched
  // until Arabic glyphs actually render — that is, at the instant someone
  // switches language. Requesting them now moves a network round trip and the
  // reflow that follows it out of the interaction.
  document.fonts?.load('400 1rem "IBM Plex Sans Arabic"', 'ا').catch(() => {});
  document.fonts?.load('500 1rem "IBM Plex Sans Arabic"', 'ا').catch(() => {});
  document.fonts?.load('600 1rem "IBM Plex Sans Arabic"', 'ا').catch(() => {});
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
