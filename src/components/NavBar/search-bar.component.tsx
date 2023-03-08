import '../../utilities/icons.styles.scss';

import { useContext } from 'react';

import PokemonContext from '../../context/PokemonContext';
import styles from './search-bar.module.scss';

const SearchBar: React.FC = () => {
  const { handleSearch, searchedPhrase } = useContext(PokemonContext);

  return (
    <div className={styles.search_bar}>
      <div className={styles.search_bar__box}>
        <i className='gg-search third_text__theme'></i>
        <input
          type="text"
          placeholder="Search Teams"
          onChange={handleSearch}
          value={searchedPhrase}
          name="searched phrase"
          className='inner_background__theme text__theme border__theme box_shadow__theme'
        />
      </div>
    </div>
  );
};

export default SearchBar;
