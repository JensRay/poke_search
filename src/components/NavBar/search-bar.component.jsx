// import { useState } from "react";

import "./search-bar.styles.scss";

const SearchBar = ({ handleSearch, searchedPhrase }) => {
  // const [searchedPhrase, setSearchedPhrase] = useState("");

  // console.log(searchedPhrase);

  // const filterSearchedPokemons = (searchedPhrase) => {
  //   setSearchedPhrase(searchedPhrase.trim().toLowerCase());
  //   // console.log(searchedPhrase);
  //   console.log("search phrase");
  //   console.log(searchedPhrase);
  //   console.log(pokemonsList);

  //   if (searchedPhrase !== "") {
  //     const filteredPokemons = pokemonsList.filter((pokemon) =>
  //       pokemon.name.includes(searchedPhrase)
  //     );
  //     console.log("not empty");
  //     console.log(filteredPokemons);

  //     setFilteredPokemonsList(filteredPokemons);
  //     // console.log(filteredPokemonsList);
  //   } else {
  //     console.log("empty");
  //     setFilteredPokemonsList(pokemonsList);
  //     console.log(filteredPokemonsList);
  //   }
  // };

  // console.log(searchedPhrase);
  // console.log("all pokemons");
  // console.log(filteredPokemonsList);
  // useEffect(() => {
  //   filterSearchedPokes(searchedPhrase);
  //   // return () => {};
  // }, [searchedPhrase]);

  return (
    <div className="search-bar">
      <div className="search-bar__box">
        <i className="gg-search"></i>
        <input
          type="text"
          placeholder="Search Teams"
          onChange={handleSearch}
          value={searchedPhrase}
          name="searched phrase"
        />
      </div>
    </div>
  );
};

export default SearchBar;
