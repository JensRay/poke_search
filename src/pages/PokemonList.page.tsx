import PokemonList from "../components/PokemonList/pokemonList.component";

import { BasePokemonType, SearchPokemonType } from "../@types/types";

const PokemonListPage:React.FC<{
  basePokemonList: BasePokemonType[],
  pokemonList: SearchPokemonType[],
  filteredPokemonList: SearchPokemonType[],
  paginatedPokemonList: () => SearchPokemonType[],
  limit: number,
  offset: number,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
  pageNumber: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
}> = ({
  filteredPokemonList,
  paginatedPokemonList,
  limit,
  offset,
  setOffset,
  pageNumber,
  setPageNumber,
}) => {
  return (
    <PokemonList
    filteredPokemonList={filteredPokemonList}
    paginatedPokemonList={paginatedPokemonList}
    limit={limit}
    setOffset={setOffset}
    offset={offset}
    pageNumber={pageNumber}
    setPageNumber={setPageNumber}
    />
  );
};

export default PokemonListPage;
