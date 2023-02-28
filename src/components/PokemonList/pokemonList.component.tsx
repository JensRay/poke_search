import './pokemonList.styles.scss';

import { SearchPokemonType } from '../../@types/types';
import DarkMode from '../DarkMode/colorMode.component';
import Pagination from '../Pagination/pagination.component';
import PokemonCard from '../PokemonCard/pokemon-card.component';

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
    <div className="main-container background__theme">
      <div className="pokemon-list__container">
        <div className="pokemon-list__header">
          <div className="additional_div_for_placing_pagination" />
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
        <div className="pokemon-list__grid">
            <div className="row">
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
        { isLoading || <div className="pagination__footer">
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
