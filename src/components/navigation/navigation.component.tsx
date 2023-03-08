import { Fragment } from 'react';

import ResultsPerPage from '../NavBar/results-per-page.component';
import SearchBar from '../NavBar/search-bar.component';
import Sorting from '../NavBar/sorting.component';
import styles from './navigation.module.scss';

const Navigation: React.FC = () => {
  return (
    <Fragment>
      <div className={`${styles.navigation_container} background__theme box_shadow__theme`}>
        <div className={styles.navigation_bar}>
          <ResultsPerPage/>
          <SearchBar/>
          <Sorting/>
        </div>
      </div>
    </Fragment>
  );
};

export default Navigation;
