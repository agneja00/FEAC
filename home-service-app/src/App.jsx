import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import RootLayout from "./components/layout/RootLayout";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import Home from "./components/pages/Home/Home";
import Services from "./components/pages/Services/Services";
import About from "./components/pages/About/About";
import Login from "./components/pages/Login/Login";
import SearchCategory from "./components/pages/SearchCategory/SearchCategory";
import AuthLayout from "./components/layout/AuthLayout";
import Register from "./components/pages/Register/Register";
import { UserProvider } from "./components/context/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.SERVICES,
        element: <Services />,
      },
      {
        path: ROUTES.ABOUT_US,
        element: <About />,
      },
      {
        path: ROUTES.SEARCH_CATEGORY,
        element: <SearchCategory />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
    ],
  },
]);

const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
