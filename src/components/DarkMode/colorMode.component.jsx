import { useState } from "react";

import "./colorMode.styles.scss";

const DarkMode = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleColorHandle = () => {
    setIsActive(!isActive);
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
