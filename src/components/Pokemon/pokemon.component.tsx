import './pokemon.styles.scss';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { SearchPokemonType } from '../../@types/types';
import { PROPERTIES_DROPDOWN } from '../../utilities/constants';
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

        setName(name);
        setImageUrl(imageUrl);
        setWeight(weight);
        setHeight(height);
        setBaseExperience(base_experience);
        setIsDefault(is_default);
        setOrder(order);
        setSpecies(capitalize(species));
        setAbilities(abilities);
        setIsLoading(false);
      } catch {
      }
      // setForm(form);
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
            <li key={ability}>{ability}</li>
          ))}
        </PropertiesDropdown>
        {PROPERTIES_DROPDOWN.map(property => <PropertiesDropdown title={property} key={property} />)}
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
