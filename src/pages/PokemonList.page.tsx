import { BasePokemonType, SearchPokemonType } from '../@types/types';
import PokemonList from '../components/PokemonList/pokemonList.component';

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
  setIsLoading
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
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

export default PokemonListPage;
