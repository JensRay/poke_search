import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import PokemonList from './pages/PokemonList';
import PokemonPage from './pages/Pokemon';

import './App.css';

const router = createBrowserRouter([
  {path: '/', element: <RootLayout />, children: [
    {path: '/', element: <Navigate to='/pokemons' replace/> },
    {path: '/pokemons', element: <PokemonList />},
    {path: '/pokemons/:pokemonId', element: <PokemonPage />},
  ]},
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
