import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Navigation from '../components/navigation/navigation.component';
import ColorModeContext from '../context/ColorModeContext';

const RootLayout: React.FC = () => {
  const { colorMode } = useContext(ColorModeContext);
  return (
    <div className={colorMode === "dark" ? "dark" : "light"}>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default RootLayout;
