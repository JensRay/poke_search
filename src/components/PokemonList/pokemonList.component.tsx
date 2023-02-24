import PokemonCard from "../PokemonCard/pokemon-card.component";
import Pagination from "../Pagination/pagination.component";
import DarkMode from "../DarkMode/colorMode.component";

import "./pokemonList.styles.scss";

import { SearchPokemonType } from '../../@types/types'

const PokemonList: React.FC<{filteredPokemonList:SearchPokemonType[],
  paginatedPokemonList: () => SearchPokemonType[],
  limit: number,
  offset: number,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
  pageNumber: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>}> = ({
  filteredPokemonList,
  paginatedPokemonList,
  limit,
  offset,
  setOffset,
  pageNumber,
  setPageNumber,
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
          {filteredPokemonList ? (
            <div className="row">
              {paginatedPokemonList()?.map(
                ({id, name, url}:{id:string, name: string, url: string }) =>
                  name && (
                    <PokemonCard
                      key={id}
                      name={name}
                      url={url}
                      id={id}
                    />
                  )
              )}
            </div>
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
