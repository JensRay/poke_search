import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../utilities/Button';
import { capitalize } from '../../utilities/functions';
import defaultImage from '../../utilities/noImagePlaceholder.svg';
import Spinner from '../../utilities/spinner/Spinner';
import DarkMode from '../DarkMode/colorMode.component';
import PropertiesDropdown from '../UI/properties-dropdown.component';
import SuggestedItems from '../UI/suggested-items.component';
import styles from './pokemon.module.scss';

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

interface PokemonObject {
  imageUrl: string;
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  is_default: boolean;
  order: number;
  types: { type: { name: string; }, slot: number; }[];
  game_indices: { version: { name: string; }, game_index: number; }[];
  stats: {base_stat: number, effort: number, stat: {name: string}}[];
  species: string;
  abilities: [];
  forms: [];
}

const Pokemon: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState <PokemonObject>({
    imageUrl: "../../utilities/default-image.jpeg",
    name: '',
    weight: 0,
    height: 0,
    base_experience: 0,
    is_default: true,
    order: 0,
    types: [],
    game_indices: [],
    stats: [],
    species: '',
    abilities: [],
    forms: [],
  })

  const id = useParams().id as string;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        const imageUrl: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id!}.png`;
        const { name, weight, height, base_experience, is_default, order, types, game_indices, stats }: PokemonProperties = data;
        const species = capitalize(data.species.name);
        const abilities = data.abilities?.map((ability: { ability: { name: string; }; }) => ability.ability.name);
        const forms = data.forms?.map((form: { name: string; }) => form.name);

        setPokemon({
          imageUrl: imageUrl, name: name, weight: weight, height: height, base_experience: base_experience, is_default: is_default, order: order, types: types, game_indices: game_indices, stats: stats, species: species, abilities: abilities, forms: forms
        })
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [id]);

  const { imageUrl,
    name,
    weight,
    height,
    base_experience,
    is_default,
    order,
    types,
    game_indices,
    stats,
    species,
    abilities,
    forms
  } = pokemon;

  function ImageWithFallback() {
    const onError = () => setPokemon((prev_state) => { return { ...prev_state, imageUrl: defaultImage }})
    return <img className={styles.pokemon_page__main_img} src={imageUrl ? imageUrl : defaultImage} onError={onError} alt={name} />
  }

  const pokemon_html = <div className={`${styles.pokemon_background} background__theme`}>
    <div className={styles.pokemon_page}>
      <div className={styles.pokemon_page__heading}>
        <div className={styles.pokemon_page__heading_side_box}>
          <Button to='/' text='&#10094; ' text2='Back'/>
        </div>
        <div className={styles.pokemon_page__heading_box}>
          {ImageWithFallback()}
        </div>
        <div className={styles.pokemon_page__heading_side_box}>
          <DarkMode />
        </div>
      </div>
      <h2 className={`${styles.pokemon_page__title} text__theme`}>{name.toUpperCase()}</h2>
      <div className={`${styles.pokemon_page__pokemon_main_properties} text__theme`}>
        <span>Height: {height}</span>
        <span>Weight: {weight}</span>
        <span>Base experience: {base_experience}</span>
        <span>Default: {is_default.toString()}</span>
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
          {game_indices?.map((gi) => (
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
      <SuggestedItems name={name} />
    </div>
  </div>;
  return (
    <>
      {isLoading ? <Spinner /> : pokemon_html}
    </>
  );
};

export default Pokemon;
