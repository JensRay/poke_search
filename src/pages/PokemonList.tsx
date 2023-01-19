import { Link } from "react-router-dom";

const PokemonList = () => {
  return <div>
    <h1>Pokemons Home</h1>
    <Link to='/pokemons/:id'>Pokemon</Link>
  </div>
};

export default PokemonList;
