import { Fragment } from "react";

import ResultsPerPage from "../NavBar/results-per-page.component";
import SearchBar from "../NavBar/search-bar.component";
import Sorting from "../NavBar/sorting.component";

import "./navigation.styles.scss";

const Navigation = ({
  searchedPhrase,
  handleSearch,
  limit,
  setLimit,
  setOffset,
  setPageNumber,
  setSortingType,
  sortingType,
  sortPokemons,
}) =>
  // {changeLimit, filterSearchedPokes, limit}: { changeLimit: any; filterSearchedPokes: any; limit: number; }
  {
    return (
      <Fragment>
        <div className="navigation-container background__theme box_shadow__theme">
          <div className="navigation-bar">
            <ResultsPerPage
              setLimit={setLimit}
              limit={limit}
              setOffset={setOffset}
              setPageNumber={setPageNumber}
            />
            <SearchBar
              setSearchedPhrase={searchedPhrase}
              handleSearch={handleSearch}
              // filterSearchedPokes={filterSearchedPokes}
            />
            <Sorting
              sortingType={sortingType}
              setSortingType={setSortingType}
              sortPokemons={sortPokemons}
            />
          </div>
        </div>
      </Fragment>
    );
  };

export default Navigation;
