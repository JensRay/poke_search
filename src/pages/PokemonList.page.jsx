import { Link } from "react-router-dom";

import PokemonList from "../components/PokemonList/pokemonList.component";

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
  return (
    <div>
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
      {/* <Link to='/pokemons/:id'>Pokemon</Link> */}
    </div>
  );
};

export default PokemonListPage;
