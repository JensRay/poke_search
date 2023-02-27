import './colorMode.styles.scss';

import { useContext, useState } from 'react';

import ColorModeContext from '../../context/ColorModeContext';

const DarkMode: React.FC = () => {
  const { colorMode, setColorMode }: {colorMode: string, setColorMode: React.Dispatch<React.SetStateAction<string>>} = useContext(ColorModeContext);
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleColorHandle = () => {
    setIsActive((isActive) => !isActive);
    setColorMode(colorMode === "light" ? "dark" : "light");
  };
  return (
    <div className="color-mode__container">
      <span className={`color-mode__title ${isActive ? "" : "active_light"}`}>
        Light Mode
      </span>
      <label className="switch">
        <input type="checkbox" onClick={toggleColorHandle} />
        <span className="slider round"></span>
      </label>
      <span className={`color-mode__title ${!isActive ? "" : "active_dark"}`}>
        Dark Mode
      </span>
    </div>
  );
};

export default DarkMode;
