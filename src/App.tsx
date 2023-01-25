import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import RootLayoutPage from './pages/RootLayout.page';
import PokemonListPage from './pages/PokemonList.page';
import PokemonPage from './pages/Pokemon.page';

import './App.css';

const router = createBrowserRouter([
  {path: '/', element: <RootLayoutPage />, children: [
    {path: '/', element: <Navigate to='/pokemons' replace/> },
    {path: '/pokemons', element: <PokemonListPage />},
    {path: '/pokemons/:pokemonId', element: <PokemonPage />},
  ]},
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
