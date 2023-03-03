import { SearchPokemonType } from '../../@types/types';
import styles from './pagination.module.scss';

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

  const pagination_active = `${styles.pagination__active} third_text__theme`
  const pagination_inactive = `${styles.pagination__inactive} grayed_text__theme`

  return (
    <div className={styles.pagination}>
      <button
        onClick={paginatePrev}
        className={`${
          offset + 1 > limit
            ? pagination_active
            : pagination_inactive
        } ${styles.pagination__button}`}
      >
        Previous page
      </button>
      <span className='text__theme'>{`${pageNumber} / ${Math.ceil(
        filteredPokemonList.length / limit
      )}`}</span>
      <button
        onClick={paginateNext}
        className={`${
          Math.ceil(filteredPokemonList.length / limit) !== pageNumber
            ? pagination_active
            : pagination_inactive
        } ${styles.pagination__button}`}
      >
        Next page
      </button>
    </div>
  );
};

export default Pagination;
