// // import { ReactNode } from "react";

import { useState } from "react";

import ColorModeContext from "./ColorModeContext";

// // interface Props {children?: ReactNode}

// // const PokemonProvider = ({children}: Props) => {
const PokemonProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("light");
  return (
    <ColorModeContext.Provider
      value={{ colorMode: colorMode, setColorMode: setColorMode }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};

export default PokemonProvider;
