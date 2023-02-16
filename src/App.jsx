import { useState, useEffect, useCallback } from "react";
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
  const [limit, setLimit] = useState(2);
  const [offset, setOffset] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  // const [paginatedPokemonList, setPaginatedPokemonList] = useState([]);

  // const changeLimit = (limit) => {
  //   setLimit(limit);
  // };

  const handleSearch = ({ target }) => {
    setSearchedPhrase(target.value.trim().toLowerCase());

    filterSearchedPokemons(target.value.trim().toLowerCase());
    // console.log(target.value);
  };

  // console.log(searchedPhrase);

  const paginatedPokemonList = () => {
    const filtered = filteredPokemonList.slice(offset, offset + limit);
    return filtered;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayoutPage
          searchedPhrase={searchedPhrase}
          handleSearch={handleSearch}
          limit={limit}
          setLimit={setLimit}
          setOffset={setOffset}
          setPageNumber={setPageNumber}
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
              limit={limit}
              offset={offset}
              setOffset={setOffset}
              paginatedPokemonList={paginatedPokemonList}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
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
    // console.log("BasePOkemonList");
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
    // console.log("PokemonList");
    getAllPokemons();
  }, [basePokemonList]);

  useEffect(() => {
    setFilteredPokemonList(pokemonList);
  }, [pokemonList]);

  // console.log(pokemonsList);
  // base pokemonsList to have a full list, never changing
  // pokemonsList to have objects with all values needed for filtering, never changing
  // filteredPokemonList based on pokemonList, changing when searchedPhrase
  // to add further filter weight etc.
  // paginatedPokemonList, based on filteredList, slicing

  // useEffect(() => {
  //   setFilteredPokemonList(pokemonList);
  // }, [pokemonList]);

  // if (searchedPhrase === "") {
  //   setFilteredPokemonList(pokemonList);
  // }

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
      const pokemons = pokemonList.filter((pokemon) =>
        pokemon.name.includes(searchedPhrase)
      );

      // setFilteredPokemonList(pokemons);
      setFilteredPokemonList(pokemons);
      // console.log("filteringsearchedPokes");
    }
  };

  // useEffect(() => {
  //   const pokemons = pokemonList.slice(offset, offset + limit);
  //   // setPaginatedPokemonList(pokemons);
  //   setFilteredPokemonList(pokemons);
  // }, []);
  // const paginate = useCallback(() => {
  //   const filtered = filteredPokemonList.slice(offset, offset + limit);
  //   setFilteredPokemonList(filtered);
  // }, []);

  // useEffect(() => {
  //   paginate();
  // }, [offset, limit, paginate]);

  // useEffect(() => {
  //   setFilteredPokemonList(paginatedPokemonList);
  // }, [paginatedPokemonList]);
  // setPaginatedPokemonList(pokemons);
  // useEffect(() => {
  //   setFilteredPokemonList(pokemons);
  // }, [pokemons]);

  // const changeLimit = (limit) => {
  //   setLimit(limit);
  // };

  return <RouterProvider router={router} />;
}

export default App;
