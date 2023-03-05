import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SearchPokemonType } from '../../@types/types';
import Button from '../../utilities/Button';
import { capitalize } from '../../utilities/functions';
import Spinner from '../../utilities/spinner/Spinner';
import DarkMode from '../DarkMode/colorMode.component';
import PropertiesDropdown from '../UI/properties-dropdown.component';
import SuggestedItems from '../UI/suggested-items.component';
import styles from './pokemon.module.scss';

interface PokemonProps { filteredPokemonList: SearchPokemonType[]; }
interface PokemonProperties {
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  is_default: boolean;
  order: number;
  species: string;
  types: [];
  game_indices: [];
  stats: [];
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
        const { name, weight, height, base_experience, is_default, order, types, game_indices, stats }: PokemonProperties = data;
        const species = data.species.name;
        const abilities = data.abilities?.map((ability: { ability: { name: string; }; }) => ability.ability.name);
        const forms = data.forms?.map((form: { name: string; }) => form.name);

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
        setGameIndices(game_indices);
        setStats(stats);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [id, pokemonIndex, url]);

  const pokemon_html = <div className={`${styles.pokemon_background} background__theme`}>
    <div className={styles.pokemon_page}>
      <div className={styles.pokemon_page__heading}>
        <div className={styles.pokemon_page__heading_side_box}>
          <Button to='/' text='&#10094; ' text2='Back'/>
        </div>
        <div className={styles.pokemon_page__heading_box}>
          <img className={styles.pokemon_page__main_img} src={imageUrl} alt={name} />
        </div>
        <div className={styles.pokemon_page__heading_side_box}>
          <DarkMode />
        </div>
      </div>
      <h2 className={`${styles.pokemon_page__title} text__theme`}>{name.toUpperCase()}</h2>
      <div className={`${styles.pokemon_page__pokemon_main_properties} text__theme`}>
        <span>Height: {height}</span>
        <span>Weight: {weight}</span>
        <span>Base experience: {baseExperience}</span>
        <span>Default: {isDefault.toString()}</span>
        <span>Order: {order}</span>
        <span>Species: {species}</span>
      </div>
      <div className={styles.pokemon_page__properties_dropdowns}>
        <PropertiesDropdown title={"Abilities"}>
          {abilities?.map((ability) => (
            <li key={ability}>{capitalize(ability)}</li>
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
