import './pokemonList.styles.scss';

import { SearchPokemonType } from '../../@types/types';
import DarkMode from '../DarkMode/colorMode.component';
import Pagination from '../Pagination/pagination.component';
import PokemonCard from '../PokemonCard/pokemon-card.component';

const PokemonList: React.FC<{filteredPokemonList:SearchPokemonType[],
  paginatedPokemonList: () => SearchPokemonType[],
  limit: number,
  offset: number,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
  pageNumber: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  }> = ({
  filteredPokemonList,
  paginatedPokemonList,
  limit,
  offset,
  setOffset,
  pageNumber,
  setPageNumber,
  isLoading,
  setIsLoading,
}) => {
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
                ({id, name, url}:{id:string, name: string, url: string }) =>
                  name && (
                    <PokemonCard
                      key={id}
                      name={name}
                      url={url}
                      id={id}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
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
