import { useContext, useState } from 'react';

import PokemonContext from '../../context/PokemonContext';
import { ITEMS_PER_PAGE } from '../../utilities/constants';
import Dropdown from '../UI/dropdown.compoment';

const ResultsPerPage: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const {limit, setLimit, setOffset, setPageNumber} = useContext(PokemonContext)
  const title = `Showing ${limit} results`;

  const toggleList = () => {
    setIsActive((isActive) => !isActive);
  };

  const handleClick = ({currentTarget}: React.MouseEvent<HTMLButtonElement>) : void => {
    setOffset(0);
    const value: string = currentTarget.value;
    setLimit(parseInt(value));
    setIsActive(false);
    setPageNumber(1);
  };

  return (
    <Dropdown dropdown_list={ITEMS_PER_PAGE} toggleList={toggleList} handleClick={handleClick} isActive={isActive} type={limit} title={title} />
  );
};

export default ResultsPerPage;
