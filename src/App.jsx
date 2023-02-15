import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import RootLayoutPage from "./pages/RootLayout.page";
import PokemonListPage from "./pages/PokemonList.page";
import PokemonPage from "./pages/Pokemon.page";

// import DisplayPokemonsContext from "./context/pokemonContext";
// import PokemonProvider from './context/PokemonProvider';

import "./App.css";

function App() {
  const [searchedPhrase, setSearchedPhrase] = useState("");
  const [basePokemonList, setBasePokemonList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = ({ target }) => {
    console.log("1");
    setSearchedPhrase(target.value.trim().toLowerCase());
    console.log("2");
    filterSearchedPokemons(target.value.trim().toLowerCase());
    // console.log(target.value);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayoutPage
          searchedPhrase={searchedPhrase}
          handleSearch={handleSearch}
        />
      ),
      children: [
        {
          path: "/",
          element: <Navigate to="/pokemons" replace />,
        },
        {
          path: "/pokemons",
          element: (
            <PokemonListPage
              basePokemonList={basePokemonList}
              pokemonList={pokemonList}
              filteredPokemonList={filteredPokemonList}
            />
          ),
        },
        { path: "/pokemon/:id", element: <PokemonPage /> },
      ],
    },
  ]);

  const getPokemonsList = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`
      );
      const data = await response.json();
      setBasePokemonList(data.results);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getPokemonsList();
  }, []);

  useEffect(() => {
    const getAllPokemons = async () => {
      const responses = await Promise.all(
        basePokemonList.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const data = await res.json();
          // console.log(data);
          return {
            // name: data.name,
            // url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
            ...pokemon,
            weight: data.weight,
            height: data.height,
          };
        })
      );
      setPokemonList(responses);
    };
    getAllPokemons();
  }, [basePokemonList]);

  // console.log(pokemonsList);

  const filterSearchedPokemons = (searchedPhrase) => {
    // setSearchedPhrase(searchedPhrase);
    // console.log(searchedPhrase);
    // setSearchedPhrase(searchedPhrase);
    // console.log(searchedPhrase);
    // console.log("search phrase");
    // console.log(searchedPhrase);
    // console.log(pokemonsList);

    if (searchedPhrase !== "") {
      // console.log("not empty");
      // console.log(pokemonsList[0].name.includes(searchedPhrase));
      const filteredPokemons = pokemonList.filter((pokemon) =>
        pokemon.name.includes(searchedPhrase)
      );
      console.log(filteredPokemons);

      setPokemonList(filteredPokemons);
    }
  };

  return (
    // <PokemonProvider
    //   // value={{
    //   //   // changeLimit: "",
    //   //   // filterSearchedPokes: "",
    //   //   // limit: 0,
    //   //   searchedPhrase,
    //   //   setSearchedPhrase,
    //   // }}
    // >
    <RouterProvider router={router} />
    // </PokemonProvider>
  );
}

export default App;
