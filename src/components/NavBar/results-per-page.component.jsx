import { useState } from "react";
import "./results-per-page.styles.scss";

const ITEMS_PER_PAGE = [10, 20, 50];

const ResultsPerPage = ({ changeLimit, limit }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleList = () => {
    setIsActive(!isActive);
  };

  const handleClick = ({ target }) => {
    const { value } = target;
    changeLimit(parseInt(value));
    setIsActive(false);
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
                className={limit === n ? "results-per-page__active" : ""}
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
