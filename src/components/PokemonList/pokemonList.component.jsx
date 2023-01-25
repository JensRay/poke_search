import { useState, useEffect } from "react";
import axios from "axios";

const PokemonList = () => {
  const [allPokemonsCount, setAllPokemonsCount] = useState(1279);
  const [pokemonsList, setPokemonsList] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  const getPokemonsList = async () => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`
    );

    const pokemonsNamesArray = await data.results.map(
      (pokemon) => pokemon.name
    );

    // console.log(pokemonsNamesArray);
    setPokemonsList(pokemonsNamesArray);
  };

  useEffect(() => {
    getPokemonsList();
  }, []);

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

  return (
    <div>
      <h1>results</h1>
      {/* {pokemons.map((pokemon) =>
        pokemon?.name} */}
    </div>
  );
};

export default PokemonList;
