import { Link } from "react-router-dom";

import PokemonList from "../components/PokemonList/pokemonList.component";

const PokemonListPage = () => {
  return <div>
    <h1>Pokemons Home</h1>
    <PokemonList />
    <Link to='/pokemons/:id'>Pokemon</Link>
  </div>
};

export default PokemonListPage;
