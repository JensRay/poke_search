import { SearchPokemonType } from '../../@types/types';
import DarkMode from '../DarkMode/colorMode.component';
import Pagination from '../Pagination/pagination.component';
import PokemonCard from '../PokemonCard/pokemon-card.component';
import styles from './pokemonList.module.scss';

interface PokemonListProps {filteredPokemonList:SearchPokemonType[],
  paginatedPokemonList: () => SearchPokemonType[];
  limit: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const PokemonList: React.FC<PokemonListProps> = ({
  filteredPokemonList,
  paginatedPokemonList,
  limit,
  offset,
  setOffset,
  pageNumber,
  setPageNumber,
  isLoading,
  setIsLoading,
}: PokemonListProps) => {
  return (
    <div className={`${styles.main_container} background__theme`}>
      <div className={styles.pokemon_list__container}>
        <div className={styles.pokemon_list__header}>
          <div className={styles.additional_div_for_placing_pagination} />
          <Pagination
            limit={limit}
            offset={offset}
            setOffset={setOffset}
            filteredPokemonList={filteredPokemonList}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
          <DarkMode />
        </div>
        <div className={styles.pokemon_list__grid}>
          <div className={styles.row}>
              {paginatedPokemonList()?.map(
                (pokemon: SearchPokemonType) =>
                  pokemon.name && (
                    <PokemonCard
                      pokemon={pokemon}
                      setIsLoading={setIsLoading}
                      key={pokemon.id}
                    />
                  )
                )
              }
            </div>
        </div>
        {isLoading || <div className={styles.pagination__footer}>
          <Pagination
            limit={limit}
            offset={offset}
            setOffset={setOffset}
            filteredPokemonList={filteredPokemonList}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>}
      </div>
    </div>
  );
};

export default PokemonList;
