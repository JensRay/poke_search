import PokemonCard from "../PokemonCard/pokemon-card.component";
import Pagination from "../Pagination/pagination.component";
import DarkMode from "../DarkMode/colorMode.component";

import "./pokemonList.styles.scss";

const PokemonList = ({
  filteredPokemonList,
  paginatedPokemonList,
  limit,
  offset,
  setOffset,
  pageNumber,
  setPageNumber,
}) => {
  // const { colorMode } = useContext(ColorModeContext);

  // const [filteredPokemonList, setFilterPokemonsList] = useState(() => {});

  // // type Pokemon = {name: string, url: string}

  //   // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  //   // const [filter, setFilter] = useState<string>("");
  //   // const [offset, setOffset] = useState<number>(0);
  //   // const [limit, setLimit] = useState<number>(20);

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
