import { Link } from "react-router-dom";

import PokemonList from "../components/PokemonList/pokemonList.component";

const PokemonListPage = ({
  basePokemonList,
  pokemonList,
  filteredPokemonList,
  paginatedPokmonList,
}) => {
  return (
    <div>
      <PokemonList
        basePokemonList={basePokemonList}
        pokemonList={pokemonList}
        filteredPokemonList={filteredPokemonList}
        paginatedPokmonList={paginatedPokmonList}
      />
      {/* <Link to='/pokemons/:id'>Pokemon</Link> */}
    </div>
  );
};

export default PokemonListPage;
