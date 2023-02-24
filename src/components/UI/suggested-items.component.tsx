import "./suggested-items.styles.scss";

import PokemonCard from "../PokemonCard/pokemon-card.component";
import { SearchPokemonType } from '../../@types/types';
var _ = require('underscore');
const SuggestedItems: React.FC<{filteredPokemonList: SearchPokemonType[], name: string}> = ({filteredPokemonList, name}) => {
  const suggestedPokemons = filteredPokemonList.filter((p) => p.name !== name)
  const array_of_suggested = _.sample(suggestedPokemons, 3)

  return (
    <div className="suggested-items__container">
      <h2 className="text__theme">You Might Also Like</h2>
      <div className="suggested-items__items">
        {array_of_suggested.map((pokemon: SearchPokemonType) =>{ return (
          <PokemonCard url={pokemon.url} name={pokemon.name} id={pokemon.id} key={pokemon.id} />
          )})
        }
      </div>
    </div>
  );
};

export default SuggestedItems;
