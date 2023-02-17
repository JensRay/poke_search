import { useState, useEffect, useCallback, useContext } from "react";

// import DarkMode from "../UI/dark-mode.component";
import PokemonCard from "../PokemonCard/pokemon-card.component";
import "./pokemonList.styles.scss";

import Pagination from "../Pagination/pagination";

const PokemonList = ({
  basePokemonList,
  pokemonList,
  filteredPokemonList,
  paginatedPokemonList,
  limit,
  offset,
  setOffset,
  pageNumber,
  setPageNumber,
}) => {
  // const [filteredPokemonList, setFilterPokemonsList] = useState(() => {});

  // // type Pokemon = {name: string, url: string}

  //   // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  //   // const [filter, setFilter] = useState<string>("");
  //   // const [offset, setOffset] = useState<number>(0);
  //   // const [limit, setLimit] = useState<number>(20);

  return (
    <div className="main-container">
      <div className="pokemon-list__container">
        <div className="pokemon-list__header">
          <Pagination
            limit={limit}
            offset={offset}
            paginatedPokemonList={paginatedPokemonList}
            setOffset={setOffset}
            filteredPokemonList={filteredPokemonList}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
          {/* <DarkMode /> */}
        </div>
        <div className="pokemon-list__grid">
          {filteredPokemonList ? (
            <div className="row">
              {paginatedPokemonList()?.map(
                (pokemon) =>
                  pokemon.name && (
                    <PokemonCard
                      key={pokemon.id}
                      name={pokemon.name}
                      url={pokemon.url}
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
