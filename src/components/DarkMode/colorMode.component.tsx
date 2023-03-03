import { useContext, useState } from 'react';

import ColorModeContext from '../../context/ColorModeContext';
import styles from './colorMode.module.scss';

const DarkMode: React.FC = () => {
  const { colorMode, setColorMode }: {colorMode: string, setColorMode: React.Dispatch<React.SetStateAction<string>>} = useContext(ColorModeContext);
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleColorHandle = () => {
    setIsActive((isActive) => !isActive);
    setColorMode(colorMode === "light" ? "dark" : "light");
  };
  return (
    <div className={styles.color_mode__container}>
      <span className={`${styles.color_mode__title} ${isActive ? "" : styles.active_light}`}>
        Light Mode
      </span>
      <label className={styles.switch}>
        <input type="checkbox" onClick={toggleColorHandle} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <span className={`${styles.color_mode__title} ${!isActive ? "" : styles.active_dark}`}>
        Dark Mode
      </span>
    </div>
  );
};

export default DarkMode;
