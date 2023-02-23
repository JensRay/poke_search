import { useState } from "react";
import "./results-per-page.styles.scss";

const ITEMS_PER_PAGE = [10, 20, 50];

const ResultsPerPage: React.FC<{limit: number, setLimit: React.Dispatch<React.SetStateAction<number>>, setOffset: React.Dispatch<React.SetStateAction<number>>, setPageNumber: React.Dispatch<React.SetStateAction<number>> }> = ({ limit, setLimit, setOffset, setPageNumber }) =>
  {
    const [isActive, setIsActive] = useState<boolean>(false);

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
            >
            {ITEMS_PER_PAGE.map((n) => {
              return (
                <button
                  onClick={handleClick}
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
