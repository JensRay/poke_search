import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Navigation from '../components/navigation/navigation.component';
import ColorModeContext from '../context/ColorModeContext';

interface RootLayoutProps {
  searchedPhrase: string,
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  limit: number,
  setLimit: React.Dispatch<React.SetStateAction<number>>,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  sortingType: string,
  setSortingType: React.Dispatch<React.SetStateAction<string>>,
  sortPokemons: (value: string) => void,
}

const RootLayout: React.FC<RootLayoutProps> = ({
  searchedPhrase,
  handleSearch,
  limit,
  setLimit,
  setOffset,
  setPageNumber,
  sortingType,
  setSortingType,
  sortPokemons,
}: RootLayoutProps) => {
  const { colorMode } = useContext(ColorModeContext);
  return (
    <div className={colorMode === "dark" ? "dark" : "light"}>
      <Navigation
        searchedPhrase={searchedPhrase}
        handleSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
        setOffset={setOffset}
        setPageNumber={setPageNumber}
        sortingType={sortingType}
        setSortingType={setSortingType}
        sortPokemons={sortPokemons}
      />
      <Outlet />
    </div>
  );
};

export default RootLayout;
