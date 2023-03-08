import React from 'react';

import { BasePokemonType, ChildrenProps, SearchPokemonType } from '../@types/types';

interface IPokemonContext {
  children?: ChildrenProps;
  searchedPhrase: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortingType: string;
  setSortingType: React.Dispatch<React.SetStateAction<string>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  sortPokemons: (text: string) => void;
  basePokemonList: BasePokemonType[];
  pokemonList: SearchPokemonType[];
  filteredPokemonList: SearchPokemonType[];
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  paginatedPokemonList: () => SearchPokemonType[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getPokemonsList: () => void,
  getAllPokemons: () => void,
  setFilteredPokemonList: React.Dispatch<React.SetStateAction<SearchPokemonType[]>>
}

const PokemonContext = React.createContext<IPokemonContext>({
  searchedPhrase: '',
  handleSearch: () => {},
  sortingType: 'Sort items',
  setSortingType: () => 'Sort items',
  limit: 20,
  setLimit: () => {},
  offset: 0,
  setOffset: () => {},
  sortPokemons: (text) => [],
  basePokemonList: [],
  pokemonList: [],
  filteredPokemonList: [],
  pageNumber: 1,
  setPageNumber: () => {},
  paginatedPokemonList: () => [],
  isLoading: true,
  setIsLoading: () => { },
  getPokemonsList: () => [],
  getAllPokemons: () => [],
  setFilteredPokemonList: () => [],
});

export default PokemonContext;
