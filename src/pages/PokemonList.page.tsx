import { Link } from "react-router-dom";

import PokemonList from "../components/PokemonList/pokemonList.component";

const PokemonListPage = () => {
  return <div>
    <PokemonList />
    {/* <Link to='/pokemons/:id'>Pokemon</Link> */}
  </div>
};

export default PokemonListPage;
