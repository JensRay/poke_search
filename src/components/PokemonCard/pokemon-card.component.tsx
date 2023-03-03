import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { SearchPokemonType } from '../../@types/types';
import Spinner from '../../utilities/spinner/Spinner';
import styles from './pokemon-card.module.scss';

interface PokemonCardInterface {
  pokemon: SearchPokemonType;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PokemonCard: React.FC<PokemonCardInterface> = ({pokemon, setIsLoading}: PokemonCardInterface) => {
  const [pokemonIndex, setPokemonIndex] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [abilities, setAbilities] = useState<string[]>([]);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const { name, weight, height, url, id } = pokemon;

  const imageLoaded = () => {
    setImageLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setPokemonIndex(id.toString());
        setImageUrl(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        );
        const res = await fetch(url);
        const data = await res.json();
        const abilities = data.abilities?.map(
          (ability: { ability: { name: string; }; }, index: any) => ability.ability.name
        );
        setAbilities(abilities);
      } catch (error) {
        console.log(error);
      }
    }
    if (setIsLoading !== undefined) {
      setIsLoading(false);
    }
    fetchData();
  }, [id, pokemonIndex, url, setIsLoading]);

  return (
    <div className={`${styles.pokemon_card__container} text__theme inner_background__theme`}>
      <Link to={`/pokemon/${pokemonIndex}`}>
        <div className={styles.pokemon_card__img}>
          <div style={{ display: imageLoading ? "block" : "none" }}>
            <Spinner />
          </div>
          <img style={{ display: imageLoading ? "none" : "block" }} src={imageUrl} alt={name} onLoad={imageLoaded} />
        </div>
      </Link>
      <h3 className={styles.pokemon_card__title}>{name}</h3>
      <div className={styles.pokemon_card__properties}>
        <div className={styles.pokemon_card__property}>
          <span className=''>Height:</span>
          <span>{height}</span>
        </div>
        <div className={styles.pokemon_card__property}>
          <span>Weight:</span>
          <span>{weight}</span>
        </div>
        <div className={styles.pokemon_card__property}>
          <span>Abilities:</span>
          <div
            className={styles.pokemon_card__abilities}>
            {abilities?.map((ability, index) => (
              <span key={index}>{ability}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.pokemon_card__details_link}>
        <Link to={`/pokemon/${pokemonIndex}`} className="third_text__theme">
          See Details
        </Link>
      </div>
    </div>
  );
};

export default PokemonCard;
