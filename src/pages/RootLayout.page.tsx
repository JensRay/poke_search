import { Outlet } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet></Outlet>
    </>
  )
};

export default RootLayout;
