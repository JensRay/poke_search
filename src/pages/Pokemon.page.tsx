import { useContext } from 'react';

import { SearchPokemonType } from '../@types/types';
import Pokemon from '../components/Pokemon/pokemon.component';
import ColorModeContext from '../context/ColorModeContext';

interface PokemonPageProps {filteredPokemonList: SearchPokemonType[]}

const PokemonPage: React.FC<PokemonPageProps> = ({filteredPokemonList}: PokemonPageProps) => {
  const { colorMode } = useContext(ColorModeContext);
  return (
    <div className={colorMode === "dark" ? "dark" : "light"}>
      <Pokemon filteredPokemonList={filteredPokemonList}/>
    </div>
  );
};

export default PokemonPage;
