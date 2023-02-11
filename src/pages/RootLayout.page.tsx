import { Outlet } from "react-router-dom";

import Navigation from "../components/navigation/navigation.component";

const RootLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet/>
    </>
  )
};

export default RootLayout;
