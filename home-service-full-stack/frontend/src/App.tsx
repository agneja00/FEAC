import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ROUTES } from "./constants/routes";
import { HelmetProvider } from "react-helmet-async";
import RootLayout from "./components/layout/RootLayout";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import Login from "./components/pages/Login/Login";
import ServicesCategory from "./components/pages/ServicesCategory/ServicesCategory";
import BusinessPartnersPage from "./components/pages/BusinessPartnersPage/BusinessPartnersPage";
import ServicePage from "./components/pages/ServicePage/ServicePage";
import BookingsPage from "./components/pages/BookingsPage/BookingsPage";
import AuthLayout from "./components/layout/AuthLayout";
import Register from "./components/pages/Register/Register";
import AccountSettingsPage from "./components/pages/AccountSettingsPage/AccountSettingsPage";
import { UserProvider } from "./components/context/UserContext";
import { ThemeProvider } from "./components/context/ThemeContext";
import Services from "./components/pages/Services/Services";
import FavoritesPage from "./components/pages/FavoritesPage/FavoritesPage";
import LanguageValidator from "./components/common/LanguageValidator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/en" replace />,
      },
      {
        path: ":lang",
        element: <LanguageValidator />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: ROUTES.SERVICES,
            element: <Services />,
          },
          {
            path: ROUTES.SERVICES_CATEGORY,
            element: <ServicesCategory />,
          },
          {
            path: ROUTES.SERVICE_ID,
            element: <ServicePage />,
          },
          {
            path: ROUTES.ABOUT_US,
            element: <About />,
          },
          {
            path: ROUTES.FOR_BUSINESS_PARTNERS,
            element: <BusinessPartnersPage />,
          },
          {
            path: ROUTES.ACCOUNT,
            element: <AccountSettingsPage />,
          },
          {
            path: ROUTES.BOOKINGS_FILTER,
            element: <BookingsPage />,
          },
          {
            path: ROUTES.FAVORITES,
            element: <FavoritesPage />,
          },
          {
            path: ROUTES.FAVORITES_CATEGORY,
            element: <FavoritesPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/:lang",
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
  {
    path: ROUTES.ERROR_LANG,
    element: <ErrorPage />,
  },
  {
    path: ROUTES.ERROR_GLOBAL,
    element: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UserProvider>
            <SnackbarProvider>
              <RouterProvider router={router} />
            </SnackbarProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
