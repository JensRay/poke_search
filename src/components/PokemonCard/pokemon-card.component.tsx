import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./pokemon-card.styles.scss";

const PokemonCard = ({name, url}: { url: string; name: string; }) => {
  const [pokemonIndex, setPokemonIndex] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setPokemonIndex(url.split("/")[url.split("/").length - 2]);
      setImageUrl(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`
      );

      const res = await fetch(url);
      const data = await res.json()
      const weight = data.weight;
      const height = data.height;
      // console.log(data.abilities)
      const abilities = data.abilities?.map(
        (ability: { ability: { name: string; }; }, index: any) => ability.ability.name
      );
      setWeight(weight);
      setHeight(height);
      setAbilities(abilities);
    }
    fetchData();
  }, [pokemonIndex, url]);


  return (
    <div className="pokemon-card__container">
      <Link to={`/pokemon/${pokemonIndex}`}>
        <div className="pokemon-card__img">
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <h3 className="pokemon-card__title">{name}</h3>
      <div className="pokemon-card__properties">
        <div className="pokemon-card__property">
          <span>Height:</span>
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
      <Link
        className="pokemon-card__details-link"
        to={`/pokemon/${pokemonIndex}`}
      >
        <div>See Details</div>
      </Link>
    </div>
  );
};

export default PokemonCard;
