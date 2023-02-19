import { Outlet } from "react-router-dom";
import { useContext } from "react";

import Navigation from "../components/navigation/navigation.component";
import ColorModeContext from "../context/ColorModeContext";

const RootLayout = ({
  searchedPhrase,
  handleSearch,
  limit,
  setLimit,
  setOffset,
  setPageNumber,
  sortingType,
  setSortingType,
  sortPokemons,
}) => {
  const { colorMode } = useContext(ColorModeContext);
  return (
    <div className={colorMode === "dark" ? "dark" : "light"}>
      <Navigation
        setSearchedPhrase={searchedPhrase}
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
