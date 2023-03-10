import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { SearchPokemonType } from '../../@types/types';
import PokemonContext from '../../context/PokemonContext';
import defaultImage from '../../utilities/noImagePlaceholder.svg';
import Spinner from '../../utilities/spinner/Spinner';
import styles from './pokemon-card.module.scss';

interface PokemonCardInterface {
  pokemon: SearchPokemonType;
}

const PokemonCard: React.FC<PokemonCardInterface> = ({ pokemon }: PokemonCardInterface) => {
  const  {setIsLoading} = useContext(PokemonContext)
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

  function ImageWithFallback() {
    const onError = () => setImageUrl(defaultImage)
    return <img style={{ display: imageLoading ? "none" : "block" }} src={imageUrl ? imageUrl : defaultImage} onError={onError} alt={name} onLoad={imageLoaded} />
  }

  const big_title = name.length > 17 ? styles.long_title : ''

  return (
    <div className={`${styles.pokemon_card__container} text__theme inner_background__theme`}>
      <Link to={`/pokemon/${pokemonIndex}`}>
        <div className={styles.pokemon_card__img}>
          <div style={{ display: imageLoading ? "block" : "none" }}>
            <Spinner />
          </div>
          {ImageWithFallback()}
        </div>
      </Link>
      <h3 className={`${styles.pokemon_card__title} ${big_title}`}>{name}</h3>
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
        <span className='third_text__theme'>
          <Link to={`/pokemon/${pokemonIndex}`}>
            See Details
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PokemonCard;
