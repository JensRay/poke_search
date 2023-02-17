import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import RootLayoutPage from "./pages/RootLayout.page";
import PokemonListPage from "./pages/PokemonList.page";
import PokemonPage from "./pages/Pokemon.page";

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
  const [sortingType, setSortingType] = useState("");

  const handleSearch = ({ target }) => {
    setSearchedPhrase(target.value.trim().toLowerCase());
    filterSearchedPokemons(target.value.trim().toLowerCase());
  };

  const sortPokemons = (type) => {
    switch (type) {
      case "From A-Z":
        const sortA_Z = filteredPokemonList.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        setFilteredPokemonList(sortA_Z);
        break;
      case "From Z-A":
        const sortZ_A = filteredPokemonList.sort((a, b) =>
          a.name < b.name ? 1 : b.name < a.name ? -1 : 0
        );
        setFilteredPokemonList(sortZ_A);
        break;
      case "By Height":
        const sortHeight = filteredPokemonList.sort(
          (a, b) => a.height - b.height
        );
        setFilteredPokemonList(sortHeight);
        break;
      case "By Weight":
        const sortWeight = filteredPokemonList.sort(
          (a, b) => a.weight - b.weight
        );
        setFilteredPokemonList(sortWeight);
        break;
      default:
        console.log("Unknown Type");
    }
  };

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
          sortingType={sortingType}
          setSortingType={setSortingType}
          sortPokemons={sortPokemons}
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
    getPokemonsList();
  }, []);

  useEffect(() => {
    const getAllPokemons = async () => {
      const responses = await Promise.all(
        basePokemonList.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const data = await res.json();
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

  useEffect(() => {
    setFilteredPokemonList(pokemonList);
  }, [pokemonList]);

  const filterSearchedPokemons = (searchedPhrase) => {
    if (searchedPhrase !== "") {
      const pokemons = pokemonList.filter((pokemon) =>
        pokemon.name.includes(searchedPhrase)
      );

      setFilteredPokemonList(pokemons);
    }
  };

  return <RouterProvider router={router} />;
}

export default App;
