import { useState } from "react";
import "./results-per-page.styles.scss";

// import PokemonContext from "../../context/PokemonContext";

const ITEMS_PER_PAGE = [1, 2, 5];

const ResultsPerPage = ({ limit, setLimit, setOffset, setPageNumber }) =>
  // { changeLimit, limit }
  {
    const [isActive, setIsActive] = useState(false);
    // const [changeLimit, limit] = useState(20);

    // console.log(limit);

    const toggleList = () => {
      setIsActive(!isActive);
    };

    const handleClick = ({ target }) => {
      setOffset(0);
      const { value } = target;
      setLimit(parseInt(value));
      setIsActive(false);
      setPageNumber(1);
    };

    return (
      <div className="results-per-page">
        <button
          className="results-per-page__dropdown__button"
          onClick={toggleList}
        >
          <span>{`Showing ${limit} results`}</span>
          {!isActive ? <span>&#65088;</span> : <span>&#65087;</span>}
        </button>
        {isActive ? (
          <div
            className="results-per-page__dropdown-container"
            onClick={handleClick}
          >
            {ITEMS_PER_PAGE.map((n) => {
              return (
                <button
                  key={n}
                  value={n}
                  className={limit !== n ? "results-per-page__active" : ""}
                >
                  Show {n} results
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

export default ResultsPerPage;
