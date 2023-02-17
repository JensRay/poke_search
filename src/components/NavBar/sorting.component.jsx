import { useState } from "react";

import "./sorting.styles.scss";

const SORTING_TYPES = ["From A-Z", "From Z-A", "By Height", "By Weight"];

const Sorting = ({ sortingType, setSortingType, sortPokemons }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleList = () => {
    setIsActive(!isActive);
  };

  const handleClick = ({ target }) => {
    const { value } = target;
    setSortingType(value);
    setIsActive(false);
    sortPokemons(value);
  };

  return (
    <div className="list__dropdown">
      <button className="list__dropdown__button" onClick={toggleList}>
        <span>Sort items</span>
        {!isActive ? <span>&#65088;</span> : <span>&#65087;</span>}
      </button>
      {isActive ? (
        <div className="list__dropdown-container" onClick={handleClick}>
          {SORTING_TYPES.map((n) => {
            return (
              <button
                key={n}
                value={n}
                className={sortingType !== n ? "list__dropdown__active" : ""}
              >
                {n}
              </button>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sorting;
