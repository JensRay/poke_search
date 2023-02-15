import { Outlet } from "react-router-dom";

import Navigation from "../components/navigation/navigation.component";

const RootLayout = ({ searchedPhrase, handleSearch }) => {
  return (
    <>
      <Navigation
        setSearchedPhrase={searchedPhrase}
        handleSearch={handleSearch}
      />
      <Outlet />
    </>
  );
};

export default RootLayout;
