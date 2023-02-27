import './pagination.styles.scss';

import { SearchPokemonType } from '../../@types/types';

interface PaginationProps {
  offset: number
  limit: number,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
  filteredPokemonList: SearchPokemonType[],
  pageNumber: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
}

const Pagination: React.FC<PaginationProps> = ({
  offset,
  limit,
  setOffset,
  filteredPokemonList,
  pageNumber,
  setPageNumber,
}: PaginationProps) => {
  const paginateNext = () => {
    if (offset + limit < filteredPokemonList.length) {
      setOffset(offset + limit);
      setPageNumber(pageNumber + 1);
    }
  };

  const paginatePrev = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="pagination">
      <span
        onClick={paginatePrev}
        className={`${
          offset + 1 > limit
            ? "pagination__active third_text__theme"
            : "pagination__inactive grayed_text__theme"
        } pagination__button`}
      >
        Previous page
      </span>
      <span className="text__theme">{`${pageNumber} / ${Math.ceil(
        filteredPokemonList.length / limit
      )}`}</span>
      <span
        onClick={paginateNext}
        className={`${
          Math.ceil(filteredPokemonList.length / limit) !== pageNumber
            ? "pagination__active third_text__theme"
            : "pagination__inactive grayed_text__theme"
        } pagination__button`}
      >
        Next page
      </span>
    </div>
  );
};

export default Pagination;
