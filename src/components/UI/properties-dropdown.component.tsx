import './properties-dropdown.styles.scss';

import { useState } from 'react';

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
    <div className="properties-dropdown">
      <button className="properties-dropdown__button inner_background__theme" onClick={handleClick}>
        <span className="text__theme">{title}</span>
        {!isActive ? <span className="third_text__theme">&#65088;</span> : <span className="third_text__theme">&#65087;</span>}
      </button>
      {isActive ? (
        <div className="properties-dropdown__container inner_background__theme text__theme">{children}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PropertiesDropdown;
