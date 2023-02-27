import React from 'react';

import { ChildrenProps } from '../@types/types';

interface ColorModeContextProps {children?: ChildrenProps, colorMode: string, setColorMode: React.Dispatch<React.SetStateAction<string>>}

const ColorModeContext = React.createContext<ColorModeContextProps>({colorMode: '', setColorMode: () => {}});

export default ColorModeContext;
