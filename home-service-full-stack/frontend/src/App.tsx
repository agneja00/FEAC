import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ROUTES } from "./constants/routes";
import RootLayout from "./components/layout/RootLayout";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import Login from "./components/pages/Login/Login";
import SearchCategory from "./components/pages/SearchCategory/SearchCategory";
import BusinessPage from "./components/pages/BusinessPage/BusinessPage";
import BookingsPage from "./components/pages/BookingsPage/BookingsPage";
import AuthLayout from "./components/layout/AuthLayout";
import Register from "./components/pages/Register/Register";
import { UserProvider } from "./components/context/UserContext";
import Services from "./components/pages/Services/Services";

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
      {
        path: ROUTES.BUSINESS_ID,
        element: <BusinessPage />,
      },
      {
        path: ROUTES.BOOKINGS,
        element: <BookingsPage />,
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;