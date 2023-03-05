import { useState } from 'react';

import { SORTING_TYPES } from '../../utilities/constants';
import Dropdown from '../UI/dropdown.compoment';

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
    <Dropdown dropdown_list={SORTING_TYPES} toggleList={toggleList} handleClick={handleClick} isActive={isActive} type={sortingType} title={ sortingType} />
  );
};

export default Sorting;
