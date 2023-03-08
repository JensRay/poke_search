import './App.scss';

import { useContext, useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import ColorModeProvider from './context/ColorModeProvider';
import PokemonContext from './context/PokemonContext';
import PokemonPage from './pages/Pokemon.page';
import PokemonListPage from './pages/PokemonList.page';
import RootLayoutPage from './pages/RootLayout.page';
import Spinner from './utilities/spinner/Spinner';

const App: React.FC = () => {
  const {
    pokemonList,
    isLoading,
    getPokemonsList,
    getAllPokemons,
    setFilteredPokemonList
  } = useContext(PokemonContext);

  useEffect(() => {
    getAllPokemons();
  }, [getAllPokemons]);

  useEffect(() => {
    getPokemonsList();
  }, [getPokemonsList]);

  useEffect(() => {
    setFilteredPokemonList(pokemonList);
  }, [pokemonList, setFilteredPokemonList]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayoutPage />
      ),
      children: [
        {
          path: "/",
          element: <Navigate to="/pokemons" replace />,
        },
        {
          path: "/pokemons",
          element: (
            <>
              <PokemonListPage />
              { isLoading && <Spinner /> }
            </>
          ),
        },
      ],
    },
    { path: "/pokemon/:id", element: <PokemonPage /> },
  ]);

  return (
    <ColorModeProvider>
      <RouterProvider router={router} />
    </ColorModeProvider>
  );
}

export default App;
