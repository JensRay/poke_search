import React from "react";

const PokemonContext = React.createContext({
  // changeLimit: '',
  // filterSearchedPokes: '',
  // limit: 0,
  searchedPhrase: "",
  pokemonsList: [],
  basePokemonList: [],
  filteredPokemonsList: [],
  changeLimit: () => {},
});

export default PokemonContext;
