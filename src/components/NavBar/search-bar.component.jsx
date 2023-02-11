import { useState, useEffect, useContext } from "react";

import PokemonContext from "../../context/PokemonContext";

import "./search-bar.styles.scss";

const SearchBar = () => {
  // const [searchedPhrase, setSearchedPhrase] = useState("");

  const { searchedPhrase, setSearchedPhrase } = useContext(PokemonContext);

  // const filterSearchedPokes = (searchPhrase) => {
  //   setFilter(searchPhrase);
  // };

  const handleSearch = ({ target }) => {
    setSearchedPhrase(target.value);
  };

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
        />
      </div>
    </div>
  );
};

export default SearchBar;
