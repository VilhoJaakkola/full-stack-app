import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const RootLayout = (): React.JSX.Element => {
  return (
    <>
      <ProtectedRoute>
        <MainNavigation />
      </ProtectedRoute>
      <Outlet />
    </>
  );
};

export default RootLayout;
