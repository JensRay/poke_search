import './sorting.styles.scss';

import { useState } from 'react';

import { SORTING_TYPES } from '../../utilities/constants';

interface SortingProps {
  sortingType: string;
  setSortingType: React.Dispatch<React.SetStateAction<string>>;
  sortPokemons: (value: string) => void;
}

const Sorting:React.FC<SortingProps> = ({ sortingType, setSortingType, sortPokemons }: SortingProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleList = () => {
    setIsActive((isActive) => !isActive);
  };

  const handleClick = ( { currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const value = currentTarget.value;
    setSortingType(value);
    setIsActive(false);
    sortPokemons(value);
  };

  return (
    <div className="list__dropdown ">
      <button
        className="list__dropdown__button box_shadow__theme inner_background__theme border__theme"
        onClick={toggleList}
      >
        <span className="grayed_text__theme">Sort items</span>
        {!isActive ? (
          <span className="third_text__theme">&#65088;</span>
        ) : (
          <span className="third_text__theme">&#65087;</span>
        )}
      </button>
      {isActive ? (
        <div
          className="list__dropdown-container box_shadow__theme inner_background__theme"

          >
          {SORTING_TYPES.map((n) => {
            return (
              <button
                onClick={handleClick}
                key={n}
                value={n}
                className={
                  sortingType !== n
                    ? "list__dropdown__active text__theme inner_background__theme"
                    : "grayed_text__theme inner_background__theme"
                }
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
