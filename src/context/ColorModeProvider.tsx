import { useState } from 'react';

import { ChildrenProps } from '../@types/types';
import ColorModeContext from './ColorModeContext';

const ColorModeProvider: React.FC<ChildrenProps> = ({children}: ChildrenProps) => {
  const [colorMode, setColorMode] = useState<string >("light");
  return (
    <ColorModeContext.Provider
      value={{ colorMode: colorMode, setColorMode: setColorMode }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
