import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MovieProvider } from './context/MovieContext';
import '@fontsource/orbitron';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MovieProvider>
    <App />
  </MovieProvider>
);
