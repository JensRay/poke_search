import { useContext } from 'react';

import { SearchPokemonType } from '../../@types/types';
import PokemonContext from '../../context/PokemonContext';
import PokemonCard from '../PokemonCard/pokemon-card.component';
import styles from './suggested-items.module.scss';

var _ = require('underscore');

interface SuggestedItemsProps { name: string; }

const SuggestedItems: React.FC<SuggestedItemsProps> = ({ name }: SuggestedItemsProps) => {
  const {filteredPokemonList} = useContext(PokemonContext)
  const suggestedPokemons = filteredPokemonList.filter((p) => p.name !== name)
  const array_of_suggested = _.sample(suggestedPokemons, 3)

  return (
    <div className={styles.suggested_items__container}>
      <h2 className="text__theme">You Might Also Like</h2>
      <div className={styles.suggested_items__items}>
        {array_of_suggested.map((pokemon: SearchPokemonType) =>{ return (
          <PokemonCard pokemon={pokemon} key={Number(pokemon.id)} />
          )})
        }
      </div>
    </div>
  );
};

export default SuggestedItems;
