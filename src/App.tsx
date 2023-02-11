import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import RootLayoutPage from './pages/RootLayout.page';
import PokemonListPage from './pages/PokemonList.page';
import PokemonPage from './pages/Pokemon.page';

// import DisplayPokemonsContext from "./context/pokemonContext";
import PokemonProvider from './context/PokemonProvider';

import './App.css';

const router = createBrowserRouter([
  {path: '/', element: <RootLayoutPage />, children: [
    {path: '/', element: <Navigate to='/pokemons' replace/> },
    {path: '/pokemons', element: <PokemonListPage />},
    {path: '/pokemon/:id', element: <PokemonPage />},
  ]},
]);

function App() {
  return (
    <PokemonProvider
      // value={{
      //   // changeLimit: "",
      //   // filterSearchedPokes: "",
      //   // limit: 0,
      //   searchedPhrase,
      //   setSearchedPhrase,
      // }}
    >
      <RouterProvider router={router} />
    </PokemonProvider>
  );
};

export default App;
