import { Fragment } from "react";

import ResultsPerPage from "../NavBar/results-per-page.component";
import Sorting from "../NavBar/sorting.component";
import SearchBar from "../NavBar/search-bar.component";

import "./navigation.styles.scss";

const Navigation = (
  // {changeLimit, filterSearchedPokes, limit}: { changeLimit: any; filterSearchedPokes: any; limit: number; }
  ) => {
  return (
    <Fragment>
      <div className="navigation-container">
        <div className="navigation-bar">
          {/* <ResultsPerPage changeLimit={changeLimit} limit={limit} /> */}
          <SearchBar
          // filterSearchedPokes={filterSearchedPokes}
          />
          {/* <Sorting /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Navigation;
