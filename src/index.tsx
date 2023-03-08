import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import PokemonContextProvider from './context/PokemonProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PokemonContextProvider>
      <App/>
    </PokemonContextProvider>
  </React.StrictMode>
);
