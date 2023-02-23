import { useState } from "react";

import ColorModeContext from "./ColorModeContext";

import { ChildrenProps } from "../@types/types";

const ColorModeProvider = (props: ChildrenProps) => {
  const [colorMode, setColorMode] = useState<string >("light");
  return (
    <ColorModeContext.Provider
      value={{ colorMode: colorMode, setColorMode: setColorMode }}
    >
      {props.children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
