import { Outlet } from "react-router-dom";

import Navigation from "../components/navigation/navigation.component";

const RootLayout = ({ searchedPhrase, handleSearch, limit, setLimit }) => {
  return (
    <>
      <Navigation
        setSearchedPhrase={searchedPhrase}
        handleSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
      />
      <Outlet />
    </>
  );
};

export default RootLayout;
