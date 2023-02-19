// import { useContext } from "react";

import PokemonList from "../components/PokemonList/pokemonList.component";
// import ColorModeContext from "../context/ColorModeContext";

const PokemonListPage = ({
  basePokemonList,
  pokemonList,
  filteredPokemonList,
  paginatedPokemonList,
  limit,
  offset,
  setOffset,
  pageNumber,
  setPageNumber,
}) => {
  // const { colorMode } = useContext(ColorModeContext);
  return (
    // <div className={colorMode === "dark" ? "dark" : "light"}>
    <PokemonList
      basePokemonList={basePokemonList}
      pokemonList={pokemonList}
      filteredPokemonList={filteredPokemonList}
      paginatedPokemonList={paginatedPokemonList}
      limit={limit}
      offset={offset}
      setOffset={setOffset}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
    />
  );
};

export default PokemonListPage;
