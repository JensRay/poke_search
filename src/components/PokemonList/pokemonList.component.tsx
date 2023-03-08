import { useContext } from 'react';

import { SearchPokemonType } from '../../@types/types';
import PokemonContext from '../../context/PokemonContext';
import DarkMode from '../DarkMode/colorMode.component';
import Pagination from '../Pagination/pagination.component';
import PokemonCard from '../PokemonCard/pokemon-card.component';
import styles from './pokemonList.module.scss';

const PokemonList: React.FC = () => {

  const { paginatedPokemonList, isLoading } = useContext(PokemonContext)

  return (
    <div className={`${styles.main_container} background__theme`}>
      <div className={styles.pokemon_list__container}>
        <div className={styles.pokemon_list__header}>
          <div className={styles.additional_div_for_placing_pagination} />
          <Pagination />
          <DarkMode />
        </div>
        <div className={styles.pokemon_list__grid}>
          <div className={styles.row}>
              {paginatedPokemonList()?.map(
                (pokemon: SearchPokemonType) =>
                  pokemon.name && (
                    <PokemonCard
                      pokemon={pokemon}
                      key={pokemon.id}
                    />
                  )
                )
              }
            </div>
        </div>
        {isLoading || <div className={styles.pagination__footer}>
         { paginatedPokemonList().length > 8 ? <Pagination /> : ''}
        </div>}
      </div>
    </div>
  );
};

export default PokemonList;
