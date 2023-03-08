import { useContext, useState } from 'react';

import PokemonContext from '../../context/PokemonContext';
import { SORTING_TYPES } from '../../utilities/constants';
import Dropdown from '../UI/dropdown.compoment';

const Sorting: React.FC = () => {
  const {sortingType, setSortingType, sortPokemons } = useContext(PokemonContext)
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
