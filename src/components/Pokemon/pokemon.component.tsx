import { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import PropertiesDropdown from "../UI/properties-dropdown.component";
import SuggestedItems from "../UI/suggested-items.component";
import DarkMode from "../DarkMode/colorMode.component";

import { PokemonProperties } from "../../@types/types";

import "./pokemon.styles.scss";

function capitalize(w: string) {
  return w[0].toUpperCase() + w.slice(1);
}

const Pokemon: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [pokemonIndex, setPokemonIndex] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [baseExperience, setBaseExperience] = useState<number>(0);
  const [isDefault, setIsDefault] = useState<boolean>(true);
  const [order, setOrder] = useState<number>(0);
  const [species, setSpecies] = useState<string>("");
  const [abilities, setAbilities] = useState<string[]>([]);
  const { id } = useParams();

  useEffect(() => {
    setPokemonIndex(Number(id));
    async function fetchData() {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`;
      const response = await fetch(url);
      const data = await response.json();
      const {name, weight, height, base_experience, is_default, order, species}: PokemonProperties = data.results
      const abilities = data.results.abilities?.map((ability: { ability: { name: string; }; }) => ability.ability.name);

      setName(name);
      setImageUrl(imageUrl);
      setWeight(weight);
      setHeight(height);
      setBaseExperience(base_experience);
      setIsDefault(is_default);
      setOrder(order);
      setSpecies(capitalize(species));
      setAbilities(abilities);
      // setForm(form);
    }
    fetchData();
  }, [id, pokemonIndex]);

  return (
    <div className="pokemon-background background__theme">
    <div className="pokemon-page ">
      <div className="pokemon-page__heading">
        <div className="pokemon-page__heading-side-box ">
          <Link className="pokemon-page__button-back button__theme" to='/'
          >
            &#10094; Back
          </Link>
        </div>
        <div className="pokemon-page__heading-box">
          <img className="pokemon-page__main-img" src={imageUrl} alt={name} />
        </div>
        <div className="pokemon-page__heading-side-box">
          <DarkMode />
        </div>
      </div>
      <h2 className="pokemon-page__title text__theme">{name.toUpperCase()}</h2>
      <div className="pokemon-page__pokemon-main-properties text__theme">
        <span className="">Height: {height}</span>
        <span>Weight: {weight}</span>
        <span>Base experience: {baseExperience}</span>
        <span>Default: {isDefault.toString()}</span>
        <span>Order: {order}</span>
        <span>Species: {species}</span>
      </div>
      <div className="pokemon-page__properties-dropdowns">
        <PropertiesDropdown title={"Abilities"}>
          {abilities?.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </PropertiesDropdown>
        <PropertiesDropdown title={"Form"} />
        <PropertiesDropdown title={"Types"} />
        <PropertiesDropdown title={"Game Indices"} />
        <PropertiesDropdown title={"Stats"} />
        <PropertiesDropdown title={"Moves"} />
      </div>
      <SuggestedItems pokemonIndex={pokemonIndex} />
    </div>
    </div>
  );
};

export default Pokemon;
