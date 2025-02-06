import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

const RootLayout = () => {
    return (
        <>
        <MainNavigation />
        <Outlet />
        </>
    );
}

export default RootLayout;