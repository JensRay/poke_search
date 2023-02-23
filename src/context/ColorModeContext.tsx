import React from "react";
import { ChildrenProps } from "../@types/types";

const ColorModeContext = React.createContext<{children?: ChildrenProps, colorMode: string, setColorMode: React.Dispatch<React.SetStateAction<string>>}>({colorMode: '', setColorMode: () => {}});

export default ColorModeContext;
