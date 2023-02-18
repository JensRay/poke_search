import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

import PropertiesDropdown from "../UI/properties-dropdown.component";
import SuggestedItems from "../UI/suggested-items.component";
import DarkMode from "../DarkMode/colorMode.component";

import "./pokemon.styles.scss";

function capitalize(w: string) {
  return w[0].toUpperCase() + w.slice(1);
}

const PokemonPage = () => {
  const [url, setUrl] = useState<string | number>("");
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
  // const [form, setForm] = useState("");
  // const [types, setTypes] = useState([]);
  // const [gameIndices, setGameIndices] = useState([]);
  // const [stats, setStats] = useState([]);
  // const [moves, setMoves] = useState([]);

  const { id } = useParams();
  // let navigate = useNavigate();

  // const handleClickBack = () => {
  //   navigate(-1);
  // };

  console.log(pokemonIndex)

  useEffect(() => {
    setPokemonIndex(Number(id));
    async function fetchData() {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
      setUrl(url);
      const imageUrl: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`;
      const res = await axios.get(url);
      const data = res.data;
      const name: string = data.name;
      const weight: number = data.weight;
      const height:number = data.height;
      const baseExperience: number = data.base_experience;
      const isDefault: boolean = data.is_default;
      const order: number = data.order;
      const species:string = data.species.name;
      const abilities = data.abilities?.map((ability: { ability: { name: string; }; }) => ability.ability.name);
      // const form = data.forms.name;
      // const abilities = data.abilities?.map((ability) => ability.ability.name);
      // const abilities = data.abilities?.map((ability) => ability.ability.name);
      // const abilities = data.abilities?.map((ability) => ability.ability.name);
      // const abilities = data.abilities?.map((ability) => ability.ability.name);

      setName(name);
      setImageUrl(imageUrl);
      setWeight(weight);
      setHeight(height);
      setBaseExperience(baseExperience);
      setIsDefault(isDefault);
      setOrder(order);
      setSpecies(capitalize(species));
      setAbilities(abilities);
      // setForm(form);
    }
    fetchData();
  }, [id, pokemonIndex]);

  return (
    <div className="pokemon-page">
      <div className="pokemon-page__heading">
        <div className="pokemon-page__heading-side-box">
          <Link className="pokemon-page__button-back" to='/'
          // onClick={handleClickBack}
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
      <h2 className="pokemon-page__title">{name.toUpperCase()}</h2>
      <div className="pokemon-page__pokemon-main-properties">
        <span>Height: {height}</span>
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
  );
};

export default PokemonPage;
