import { useState } from 'react';

import { ITEMS_PER_PAGE } from '../../utilities/constants';
import Dropdown from '../UI/dropdown.compoment';

interface ResultsPerPageProps {
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const ResultsPerPage: React.FC<ResultsPerPageProps> = ({ limit, setLimit, setOffset, setPageNumber }: ResultsPerPageProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
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
