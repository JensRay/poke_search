import React, { useCallback, useState } from 'react';

import { BasePokemonType, ChildrenProps, SearchPokemonType } from '../@types/types';
import PokemonContext from './PokemonContext';

const PokemonContextProvider: React.FC<ChildrenProps> = ({ children }: ChildrenProps) => {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [searchedPhrase, setSearchedPhrase] = useState<string>("");
  const [basePokemonList, setBasePokemonList] = useState<BasePokemonType[]>([]);
  const [pokemonList, setPokemonList] = useState<SearchPokemonType[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<SearchPokemonType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [sortingType, setSortingType] = useState<string>('Sort items');
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const filterSearchedPokemons = (searchedPhrase: string) => {
    const pokemons = pokemonList.filter((pokemon) =>
      pokemon.name.includes(searchedPhrase)
    );
    setFilteredPokemonList(pokemons);
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

  const getPokemonsList = useCallback(async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000`
      );
      const data = await response.json();

      setBasePokemonList(data.results);
    } catch (error) {
      console.log(error);
    }
  },[]);

  const getAllPokemons = useCallback(async () => {
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
  },[basePokemonList]);

  return (
    <PokemonContext.Provider value={{
      searchedPhrase: searchedPhrase,
      handleSearch: handleSearch,
      sortingType: sortingType,
      setSortingType: setSortingType,
      limit: limit,
      setLimit: setLimit,
      offset: offset,
      setOffset: setOffset,
      setPageNumber: setPageNumber,
      sortPokemons: sortPokemons,
      basePokemonList: basePokemonList,
      pokemonList: pokemonList,
      filteredPokemonList: filteredPokemonList,
      pageNumber: pageNumber,
      paginatedPokemonList: paginatedPokemonList,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      getPokemonsList: getPokemonsList,
      getAllPokemons: getAllPokemons,
      setFilteredPokemonList: setFilteredPokemonList,
    }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContextProvider;
