// // import { ReactNode } from "react";

import { useState } from "react";

import PokemonContext from "./PokemonContext";

// // interface Props {children?: ReactNode}

// // const PokemonProvider = ({children}: Props) => {
const PokemonProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("light");
  return (
    <PokemonContext.Provider
      value={{ colorMode: colorMode, setColorMode: setColorMode }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
