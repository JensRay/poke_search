import { useContext } from "react";

import Pokemon from "../components/Pokemon/pokemon.component";
import ColorModeContext from "../context/ColorModeContext";

const PokemonPage = () => {
  const { colorMode } = useContext(ColorModeContext);
  return (
    <div className={colorMode === "dark" ? "dark" : "light"}>
      <Pokemon />
    </div>
  );
};

export default PokemonPage;
