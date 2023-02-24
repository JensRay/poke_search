import { useContext } from "react";

import Pokemon from "../components/Pokemon/pokemon.component";
import ColorModeContext from "../context/ColorModeContext";
import { SearchPokemonType } from '../@types/types';


const PokemonPage: React.FC<{filteredPokemonList: SearchPokemonType[]}> = ({filteredPokemonList}) => {
  const { colorMode } = useContext(ColorModeContext);
  return (
    <div className={colorMode === "dark" ? "dark" : "light"}>
      <Pokemon filteredPokemonList={filteredPokemonList}/>
    </div>
  );
};

export default PokemonPage;
