import { useState } from 'react';

import ChevronDropdown from './chevron-dropdown.component';
import styles from './properties-dropdown.module.scss';

interface PropertiesDropdownProps { title: string; children?: React.ReactNode; }

const PropertiesDropdown: React.FC<PropertiesDropdownProps> = ({ title, children }: PropertiesDropdownProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleList = () => {
    setIsActive(!isActive);
  };

  const handleClick = () => {
    toggleList();
  };

  return (
    <div className={styles.properties_dropdown}>
      <button className={`${styles.properties_dropdown__button} inner_background__theme`} onClick={handleClick}>
        <span className="text__theme">{title}</span>
        <ChevronDropdown isActive={isActive} />
      </button>
      {isActive ? (
        <div className={`${styles.properties_dropdown__container} inner_background__theme text__theme`}>{children}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PropertiesDropdown;
