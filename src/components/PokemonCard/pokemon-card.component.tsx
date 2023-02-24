import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./pokemon-card.styles.scss";

const PokemonCard: React.FC<{ url: string; name: string; }> = ({name, url} ) => {
  const [pokemonIndex, setPokemonIndex] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [abilities, setAbilities] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setPokemonIndex(url!.split("/")[url!.split("/").length - 2]);
        setImageUrl(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex!}.png`
          );

          const res = await fetch(url);
          const data = await res.json()
          const weight = data.weight;
          const height = data.height;
          const abilities = data.abilities?.map(
            (ability: { ability: { name: string; }; }, index: any) => ability.ability.name
            );
            setWeight(weight);
            setHeight(height);
            setAbilities(abilities);
          } catch (error) {

          }
    }
    fetchData();
  }, [pokemonIndex, url]);


  return (
    <div className="pokemon-card__container text__theme inner_background__theme">
      <Link to={`/pokemon/${pokemonIndex}`}>
        <div className="pokemon-card__img">
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <h3 className="pokemon-card__title">{name}</h3>
      <div className="pokemon-card__properties">
        <div className="pokemon-card__property">
          <span className=''>Height:</span>
          <span>{height}</span>
        </div>
        <div className="pokemon-card__property">
          <span>Weight:</span>
          <span>{weight}</span>
        </div>
        <div className="pokemon-card__property">
          <span>Abilities:</span>
          <div className="pokemon-card__abilities">
            {abilities?.map((ability,index) => (
              <span key={index}>{ability}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="pokemon-card__details-link">
        <Link to={`/pokemon/${pokemonIndex}`} className="third_text__theme">
          See Details
        </Link>
      </div>
    </div>
  );
};

export default PokemonCard;
