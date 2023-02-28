import './suggested-items.styles.scss';

import { SearchPokemonType } from '../../@types/types';
import PokemonCard from '../PokemonCard/pokemon-card.component';

var _ = require('underscore');

interface SuggestedItemsProps { filteredPokemonList: SearchPokemonType[], name: string; }

const SuggestedItems: React.FC<SuggestedItemsProps> = ({filteredPokemonList, name}: SuggestedItemsProps) => {
  const suggestedPokemons = filteredPokemonList.filter((p) => p.name !== name)
  const array_of_suggested = _.sample(suggestedPokemons, 3)

  return (
    <div className="suggested-items__container">
      <h2 className="text__theme">You Might Also Like</h2>
      <div className="suggested-items__items">
        {array_of_suggested.map((pokemon: SearchPokemonType) =>{ return (
          <PokemonCard pokemon={pokemon} key={Number(pokemon.id)} />
          )})
        }
      </div>
    </div>
  );
};

export default SuggestedItems;
