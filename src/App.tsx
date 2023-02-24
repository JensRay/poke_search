import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import RootLayoutPage from "./pages/RootLayout.page";
import PokemonListPage from "./pages/PokemonList.page";
import PokemonPage from "./pages/Pokemon.page";

import ColorModeProvider from "./context/ColorModeProvider";

import "./App.css";

import { BasePokemonType, SearchPokemonType } from './@types/types'

const App: React.FC = () =>  {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [searchedPhrase, setSearchedPhrase] = useState<string>("");
  const [basePokemonList, setBasePokemonList] = useState<BasePokemonType[]>([]);
  const [pokemonList, setPokemonList] = useState<SearchPokemonType[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<SearchPokemonType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [sortingType, setSortingType] = useState<string>('');

  const filterSearchedPokemons = (searchedPhrase: string) => {
    if (searchedPhrase !== "") {
      const pokemons = pokemonList.filter((pokemon) =>
        pokemon.name.includes(searchedPhrase)
      );

      setFilteredPokemonList(pokemons);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchedPhrase(value.trim().toLowerCase());
    filterSearchedPokemons(value.trim().toLowerCase());
  };

  const sortPokemons = (type:string) => {
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

  const paginatedPokemonList = ():SearchPokemonType[] => {
    const filtered = filteredPokemonList.slice(offset, offset + limit);
    return filtered;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayoutPage
          searchedPhrase={searchedPhrase}
          sortingType={sortingType}
          handleSearch={handleSearch}
          limit={limit}
          setLimit={setLimit}
          setOffset={setOffset}
          setPageNumber={setPageNumber}
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
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              paginatedPokemonList={paginatedPokemonList}
            />
          ),
        },
      ],
    },
    { path: "/pokemon/:id", element: <PokemonPage filteredPokemonList={filteredPokemonList}/> },
  ]);

  const getPokemonsList = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000`
      );
      const data = await response.json();

      setBasePokemonList(data.results);
    } catch (error) {
      // setError(error);
      console.log(error);
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
            ...pokemon,
            weight: data.weight,
            height: data.height,
            id: data.id,
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



  return (
    <ColorModeProvider>
      <RouterProvider router={router} />;
    </ColorModeProvider>
  );
}

export default App;
