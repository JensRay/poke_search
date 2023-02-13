import { useState, useEffect, useCallback, useContext } from "react";

// import DarkMode from "../UI/dark-mode.component";
import PokemonCard from "../PokemonCard/pokemon-card.component";
import PokemonContext from "../../context/PokemonContext";
import "./pokemonList.styles.scss";

const PokemonList = () => {
  const { basePokemonList, pokemonsList, filteredPokemonsList } =
    useContext(PokemonContext);
  const [filter, setFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);

  const paginateNext = () => {
    if (offset + limit < basePokemonList.length) {
      setOffset(offset + limit);
    }
  };

  const paginatePrev = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  // const { searchedPhrase, setSearchedPhrase } = useContext(PokemonContext);
  // // // type Pokemon = {name: string, url: string}
  // const [basePokemonList, setBasePokemonList] = useState([]);
  // const [pokemonsList, setPokemonsList] = useState([]);
  // // const [pokemons, setPokemons] = useState([]);
  // const [filteredPokemonsList, setFilteredPokemonsList] = useState([]);

  //   // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  //   // const [filter, setFilter] = useState<string>("");
  //   // const [offset, setOffset] = useState<number>(0);
  //   // const [limit, setLimit] = useState<number>(20);
  //   const [pokemons, setPokemons] = useState([]);
  // const [filter, setFilter] = useState("");
  // const [offset, setOffset] = useState(0);
  // const [limit, setLimit] = useState(20);
  // const [error, setError] = useState("");

  //   const changeLimit = (limit) => {
  //     setLimit(limit);
  //   };

  // console.log(searchedPhrase);

  // const paginateNext = () => {
  //   if (offset + limit < basePokemonList.length) {
  //     setOffset(offset + limit);
  //   }
  // };

  // const paginatePrev = () => {
  //   if (offset - limit >= 0) {
  //     setOffset(offset - limit);
  //   }
  // };

  //   const filterSearchedPokes = (searchPhrase) => {
  //     setFilter(searchPhrase);
  //   };

  // const getPokemonsList = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`
  //     );
  //     const data = await response.json();
  //     setBasePokemonList(data.results);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  // useEffect(() => {
  //   getPokemonsList();
  // }, []);

  // useEffect(() => {
  //   const getAllPokemons = async () => {
  //     const responses = await Promise.all(
  //       basePokemonList.map(async (pokemon) => {
  //         const res = await fetch(pokemon.url);
  //         const data = await res.json();
  //         // console.log(data);
  //         return {
  //           // name: data.name,
  //           // url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
  //           ...pokemon,
  //           weight: data.weight,
  //           height: data.height,
  //         };
  //       })
  //     );
  //     setPokemonsList(responses);
  //   };
  //   getAllPokemons();
  // }, [basePokemonList]);

  // const filterSearchedPokemons = (searchedPhrase) => {
  //   setSearchedPhrase(searchedPhrase.trim().toLowerCase());
  //   // console.log(searchedPhrase);
  //   console.log("search phrase");
  //   console.log(searchedPhrase);
  //   console.log(pokemonsList);

  //   if (searchedPhrase !== "") {
  //     const filteredPokemons = pokemonsList.filter((pokemon) =>
  //       pokemon.name.includes(searchedPhrase)
  //     );
  //     console.log("not empty");
  //     console.log(filteredPokemons);

  //     setFilteredPokemonsList(filteredPokemons);
  //     // console.log(filteredPokemonsList);
  //   } else {
  //     console.log("empty");
  //     setFilteredPokemonsList(pokemonsList);
  //     console.log(filteredPokemonsList);
  //   }
  // };

  // if (searchedPhrase.trim() !== "") {
  //   const p = pokemonsList.filter((pokemon) => pokemon.name.includes("cha"));
  //   setFilteredPokemonsList(p);
  // }

  // const filterPokemons = useCallback(() => {
  //   return pokemonsList.filter((pokemon) => pokemon.name.includes("bul"));
  // }, [pokemonsList]);

  // console.log(filterPokemons(searchedPhrase));

  // useEffect(() => {
  //   const filterPokemons = () => {
  //     const pokemons = pokemonsList.filter((pokemon) =>
  //       pokemon.name.includes(searchedPhrase)
  //     );
  //     setPokemonsList(pokemons);
  //   };
  //   filterPokemons();
  // }, [pokemonsList, searchedPhrase]);

  // console.log("search phrase");
  // console.log(searchedPhrase);
  // console.log("all pokemons");
  // console.log(pokemonsList);

  // const paginate = useCallback(() => {
  //   return pokemonsList.slice(offset, limit);
  // }, [limit, offset, pokemonsList]);

  // useEffect(() => {
  //   setPokemonsList(paginate());
  // }, [paginate]);

  // console.log("first 20");
  // console.log(pokemonsList);

  console.log(pokemonsList);

  return (
    <div className="main-container">
      {/* <Navigation
        changeLimit={changeLimit}
        filterSearchedPokes={filterSearchedPokes}
        limit={limit}
      /> */}
      <div className="pokemon-list__container">
        <div className="pokemon-list__header">
          {/* <div className="pagination">
            <span
              onClick={paginatePrev}
              className={`${
                offset + 1 > limit && "pagination__active"
              } pagination__button`}
            >
              Previous page
            </span>
            <span className="pagination__counter">{`${offset + 1} / ${
              offset + limit
            }`}</span>
            <span
              onClick={paginateNext}
              className={`${
                offset < pokemonsList.length ? "pagination__active" : ""
              } pagination__button`}
            >
              Next page
            </span>
          </div> */}
          {/* <DarkMode /> */}
        </div>
        <div className="pokemon-list__grid">
          {filteredPokemonsList ? (
            <div className="row">
              {
                filteredPokemonsList?.map(
                  (pokemon) =>
                    pokemon.name && (
                      // .includes("bulba")
                      <PokemonCard
                        key={pokemon.name}
                        name={pokemon.name}
                        url={pokemon.url}
                      />
                    )
                )
                // .split(offset, offset + limit)
              }
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

// console.log(basePokemonList);
// console.log(basePokemonList);
// useEffect(() => {
//   setPokemonsList(basePokemonList);
// }, [basePokemonList]);

// console.log(pokemonsList);

// for now pokemonslist always loading from basepokemonlist. That has to change

// if (pokemonsList.length !== basePokemonList.length) {
//   setPokemonsList(basePokemonList);
// }

// let filteredPokemonList = basePokemonList.map((pokemon) =>
//   pokemon.includes(searchedPhrase.trim())
// );
// useEffect(() => {
//   setPokemonsList(filteredPokemonList);
// }, [searchedPhrase, basePokemonList]);

// console.log(filteredPokemonList.length);

// let filteredPokemonList = basePokemonList?.map((pokemon) =>
//   pokemon.includes(searchedPhrase.trim())
// );
// console.log(filteredPokemonList);

// const searchNames = () => {};

// 1. Check .count to see how many objects there are (100000)
// 2. Do I need all objects? or should I search API? Can't search API. First search through the names of the pokemons.
// 3. download all Pokemons with name that are being searched - url/nameOfThePokemon ->
// 4. created

// 1. set 2000, too high, auto adjust all pokemons list name
// 2. get the list
// 3. add search
// 4. search filters 10, 20 , 50?
// 5. a-Z, Z-a
// 6. by height and weight - it means that I need that request before? So I'm sorting already objects, with: url, name, height and weight
// 7. pagination, without url,

// Can I use API to get all objects from db or get them all (only with what I need: name, url, weigth, and height) and then do pagination,

// const getAmountOfPokemons = async () => {
//   const { data } = await axios.get(
//     `https://pokeapi.co/api/v2/pokemon?limit=0&offset=0`
//   );
//   // console.log(data.count);
//   setAllPokemonsCount(data.count);
// };

// useEffect(() => {
//   getAmountOfPokemons();
// }, []);

// const searchPokemonName = async () => {
//   const { data } = await axios.get(
//     `https://pokeapi.co/api/v2/pokemon?limit=${allPokemonsCount}&offset=0`
//   );
// };

// const getAllPokemons = async () => {
//   const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/1`);
//   // console.log(data);
// };

// useEffect(() => {
//   getAllPokemons();
// }, []);

// console.log(allPokemonsCount);

// const getData = async () => {
//   const { data } = await axios.get(
//     `https://pokeapi.co/api/v2/pokemon/?limit=${allPokemonsCount}&offset=0`
//   );

// console.log(data.results.length);
//   const arrayOfPokemonNames = data.results.map((pokemon) => pokemon.name);
//   setPokemons(arrayOfPokemonNames);
// };

// useEffect(() => {
//   getData();
// }, [getData]);
// console.log(pokemons);
