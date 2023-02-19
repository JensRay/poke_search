import { useState } from "react";
import "./results-per-page.styles.scss";

const ITEMS_PER_PAGE = [10, 20, 50];

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
          className="results-per-page__dropdown__button box_shadow__theme inner_background__theme border__theme"
          onClick={toggleList}
        >
          <span className="grayed_text__theme">{`Showing ${limit} results`}</span>
          {!isActive ? (
            <span className="third_text__theme">&#65088;</span>
          ) : (
            <span className="third_text__theme">&#65087;</span>
          )}
        </button>
        {isActive ? (
          <div
            className="results-per-page__dropdown-container  box_shadow__theme inner_background__theme"
            onClick={handleClick}
          >
            {ITEMS_PER_PAGE.map((n) => {
              return (
                <button
                  key={n}
                  value={n}
                  className={
                    limit !== n
                      ? "results-per-page__active text__theme inner_background__theme"
                      : "grayed_text__theme inner_background__theme"
                  }
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
