import { Outlet } from "react-router-dom";

import Navigation from "../components/navigation/navigation.component";

const RootLayout = ({
  searchedPhrase,
  handleSearch,
  limit,
  setLimit,
  setOffset,
  setPageNumber,
}) => {
  return (
    <>
      <Navigation
        setSearchedPhrase={searchedPhrase}
        handleSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
        setOffset={setOffset}
        setPageNumber={setPageNumber}
      />
      <Outlet />
    </>
  );
};

export default RootLayout;
