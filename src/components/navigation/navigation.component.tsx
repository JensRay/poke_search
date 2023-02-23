import { Fragment } from "react";

import ResultsPerPage from "../NavBar/results-per-page.component";
import SearchBar from "../NavBar/search-bar.component";
import Sorting from "../NavBar/sorting.component";

import "./navigation.styles.scss";

const Navigation: React.FC<{
  searchedPhrase: string,
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  limit: number,
  setLimit: React.Dispatch<React.SetStateAction<number>>,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  setSortingType: React.Dispatch<React.SetStateAction<string>>,
  sortingType: string,
  sortPokemons: (value: string) => void,
}> = ({
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
              searchedPhrase={searchedPhrase}
              handleSearch={handleSearch}
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
