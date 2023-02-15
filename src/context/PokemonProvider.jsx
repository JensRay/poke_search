// import { ReactNode } from "react";

import { useState, useEffect } from "react";

import PokemonContext from "./PokemonContext";

// interface Props {children?: ReactNode}

// const PokemonProvider = ({children}: Props) => {
const PokemonProvider = ({ children }) => {
  // const PokemonProvider = ({ children }) => {
  const [searchedPhrase, setSearchedPhrase] = useState("");
  // const [pokemonsList, setPokemonsList] = useState([]);
  // const [filteredPokemonList, setFilterPokemonsList] = useState(() => {});

  // const [searchedPhrase, setSearchedPhrase] = useState("");
  const [basePokemonList, setBasePokemonList] = useState([]);
  const [pokemonsList, setPokemonsList] = useState([]);
  const [filteredPokemonsList, setFilteredPokemonsList] = useState([]);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(2);
  // // type Pokemon = {name: string, url: string}
  // const [pokemons, setPokemons] = useState([]);

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
      setPokemonsList(responses);
    };
    getAllPokemons();
  }, [basePokemonList]);

  // console.log(pokemonsList);
  const filterSearchedPokemons = (searchedPhrase) => {
    setSearchedPhrase(searchedPhrase);
    // console.log(searchedPhrase);
    // setSearchedPhrase(searchedPhrase);
    // console.log(searchedPhrase);
    // console.log("search phrase");
    // console.log(searchedPhrase);
    // console.log(pokemonsList);

    if (searchedPhrase !== "") {
      // console.log("not empty");
      // console.log(pokemonsList[0].name.includes(searchedPhrase));
      const filteredPokemons = pokemonsList.filter((pokemon) =>
        pokemon.name.includes(searchedPhrase)
      );

      // console.log(filteredPokemons);

      setFilteredPokemonsList(filteredPokemons);
    } else {
      // console.log("empty");
      setFilteredPokemonsList(pokemonsList);
      // console.log(filteredPokemonsList);
    }
  };
  // console.log(filteredPokemonsList);

  const changeLimit = (limit) => {
    setLimit(limit);
  };

  return (
    <PokemonContext.Provider
      value={{
        // filterSearchedPokes:''
        // searchedPhrase: searchedPhrase,
        filterSearchedPokemons: filterSearchedPokemons,
        filteredPokemonsList: filteredPokemonsList,
        changeLimit: changeLimit,
        limit: limit,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
