import './pokemon.styles.scss';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { SearchPokemonType } from '../../@types/types';
import { capitalize } from '../../utilities/functions';
import Spinner from '../../utilities/spinner/Spinner';
import DarkMode from '../DarkMode/colorMode.component';
import PropertiesDropdown from '../UI/properties-dropdown.component';
import SuggestedItems from '../UI/suggested-items.component';

interface PokemonProps { filteredPokemonList: SearchPokemonType[]; }
interface PokemonProperties {
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  is_default: boolean;
  order: number;
  species: string;
}

const Pokemon: React.FC<PokemonProps> = ({ filteredPokemonList }: PokemonProps) => {
  const [name, setName] = useState<string>("");
  const [pokemonIndex, setPokemonIndex] = useState<string>('1');
  const [imageUrl, setImageUrl] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [baseExperience, setBaseExperience] = useState<number>(0);
  const [isDefault, setIsDefault] = useState<boolean>(true);
  const [order, setOrder] = useState<number>(0);
  const [species, setSpecies] = useState<string>("");
  const [abilities, setAbilities] = useState<string[]>([]);
  const [forms, setForms] = useState<string[]>([])
  const [types, setTypes] = useState<{ type: { name: string; }, slot: number; }[]>([])
  const [gameIndices, setGameIndices] = useState<{ version: { name: string; }, game_index: number; }[]>([])
  const [stats, setStats] = useState<{base_stat: number, effort: number, stat: {name: string}}[]>([])
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const id = useParams().id as string;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setPokemonIndex(id);
        setUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex!}`);
        const imageUrl: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex!}.png`;
        const response = await fetch(url);
        const data = await response.json();
        const { name, weight, height, base_experience, is_default, order }: PokemonProperties = data;
        const species = data.species.name;
        const abilities = data.abilities?.map((ability: { ability: { name: string; }; }) => ability.ability.name);
        const forms = data.forms?.map((form: { name: string; }) => form.name);
        const types = data.types;
        const gameIndices = data.game_indices;
        const stats = data.stats;

        setName(name);
        setImageUrl(imageUrl);
        setWeight(weight);
        setHeight(height);
        setBaseExperience(base_experience);
        setIsDefault(is_default);
        setOrder(order);
        setSpecies(capitalize(species));
        setAbilities(abilities);
        setForms(forms);
        setTypes(types);
        setGameIndices(gameIndices);
        setStats(stats);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [id, pokemonIndex, url]);

  const pokemon_html = <div className="pokemon-background background__theme">
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
            <li key={ability} className='third-text__theme'>{capitalize(ability)}</li>
          ))}
        </PropertiesDropdown>
        <PropertiesDropdown title={"Forms"}>
          {forms?.map((form) => (
            <li key={form}>{capitalize(form)}</li>
          ))}
        </PropertiesDropdown>
        <PropertiesDropdown title={"Types"}>
          {types?.map((t) => (
            <li key={t.type.name}>
              <span>Name: {capitalize(t.type.name)}</span>
              <span>Slot: {t.slot}</span>
            </li>
          ))}
        </PropertiesDropdown>
        <PropertiesDropdown title={"Game Indices"}>
          {gameIndices?.map((gi) => (
            <li key={gi.version.name}>
              <span>Game Index: {gi.game_index}</span>
              <span>Version: {capitalize(gi.version.name)}</span>
            </li>
          ))}
        </PropertiesDropdown>
        <PropertiesDropdown title={"Stats"}>
          {stats?.map((s) => (
            <li key={s.stat.name}>
              <span>Name: {capitalize(s.stat.name)}</span>
              <span>Effort: {s.effort}</span>
              <span>Base Stat: {s.base_stat}</span>
            </li>
          ))}
        </PropertiesDropdown>
      </div>
      <SuggestedItems filteredPokemonList={filteredPokemonList} name={name} />
    </div>
  </div>;
  return (
    <>
      {isLoading ? <Spinner /> : pokemon_html}
    </>
  );
};

export default Pokemon;
