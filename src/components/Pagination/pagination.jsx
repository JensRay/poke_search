import { useState } from "react";

import "./pagination.styles.scss";

const Pagination = ({
  offset,
  limit,
  paginatedPokemonList,
  setOffset,
  filteredPokemonList,
  pageNumber,
  setPageNumber,
}) => {
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
          offset + 1 > limit ? "pagination__active" : "pagination__inactive"
        } pagination__button`}
      >
        Previous page
      </span>
      <span className="pagination__counter">{`${pageNumber} / ${
        filteredPokemonList.length / limit
      }`}</span>
      <span
        onClick={paginateNext}
        className={`${
          filteredPokemonList.length / limit !== pageNumber
            ? "pagination__active"
            : "pagination__inactive"
        } pagination__button`}
      >
        Next page
      </span>
    </div>
  );
};

export default Pagination;
