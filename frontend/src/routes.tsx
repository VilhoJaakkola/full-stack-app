import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Drivers from "./pages/Drivers.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

import ProtectedRoute from "./components/ProtectedRoute.tsx";
import RootLayout from "./components/RootLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,        // This is the layout that will be used for all the children
    errorElement: <ErrorPage />,    // This is the error page that will show up if any of the children fail
    children: [                     
        { index: true, element: <Home /> }, // This is the child that will be rendered when the path is "/"
        {
          path: "drivers",
          element: (
            <ProtectedRoute>
              <Drivers />
            </ProtectedRoute>
          ) // Protected route to "/drivers"
        }
    ],
  },
]);

const CreatedRouter = ():React.JSX.Element => <RouterProvider router={router}/>

export default CreatedRouter;
