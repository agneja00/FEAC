import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ServicesContent from "./ServicesContent";
import {
  useFavoriteServices,
  useServiceData,
  useServicePath,
  useServices,
  useToggleFavorite,
} from "../service/hooks";
import { generatePath, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IService, ServiceWithFavorite } from "../service/types";
import { UserContext } from "../context/UserContext";
import { IUser } from "../user/types";
import { ROUTES } from "@/constants/routes";

jest.mock("../service/hooks", () => ({
  useServiceData: jest.fn(),
  useToggleFavorite: jest.fn(),
  useFavoriteServices: jest.fn(),
  useServices: jest.fn(),
  useServicePath: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
  generatePath: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => key,
    i18n: { language: "en", changeLanguage: jest.fn() },
  })),
}));

const services: IService[] = [
  {
    _id: "1",
    name: "Service 1",
    about: "About Service 1",
    address: "Address 1",
    category: "Cleaning",
    contactPerson: "Contact 1",
    email: "email1@example.com",
    imageUrls: [],
    favoritedBy: [],
    translations: {
      name: { en: "Service 1", lt: "Paslauga 1", ru: "Услуга 1" },
      about: { en: "About Service 1", lt: "Apie Paslaugą 1", ru: "О Услуге 1" },
      category: { en: "Cleaning", lt: "Valymas", ru: "Уборка" },
    },
  },
  {
    _id: "2",
    name: "Service 2",
    about: "About Service 2",
    address: "Address 2",
    category: "Plumbing",
    contactPerson: "Contact 2",
    email: "email2@example.com",
    imageUrls: [],
    favoritedBy: [],
    translations: {
      name: { en: "Service 2", lt: "Paslauga 2", ru: "Услуга 2" },
      about: { en: "About Service 2", lt: "Apie Paslaugą 2", ru: "О Услуге 2" },
      category: { en: "Plumbing", lt: "Vamzdynas", ru: "Сантехника" },
    },
  },
];

const favoriteServices: ServiceWithFavorite[] = [
  {
    _id: "1",
    name: "Service 1",
    about: "About Service 1",
    address: "Address 1",
    category: "Cleaning",
    contactPerson: "Contact 1",
    email: "email1@example.com",
    imageUrls: [],
    favoritedBy: ["user@example.com"],
    translations: {
      name: { en: "Service 1", lt: "Paslauga 1", ru: "Услуга 1" },
      about: { en: "About Service 1", lt: "Apie Paslaugą 1", ru: "О Услуге 1" },
      category: { en: "Cleaning", lt: "Valymas", ru: "Уборка" },
    },
    isFavorite: true,
  },
];

const mockUser: IUser = {
  _id: "123",
  name: "Test User",
  email: "user@example.com",
};

const MockUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <UserContext.Provider
    value={{
      user: mockUser,
      isLoggedIn: true,
      login: jest.fn(),
      logout: jest.fn(),
    }}
  >
    {children}
  </UserContext.Provider>
);

beforeEach(() => {
  (useServiceData as jest.Mock).mockReturnValue({
    allServices: services,
    favoriteServices: favoriteServices,
  });

  (useParams as jest.Mock).mockReturnValue({
    category: undefined,
    lang: "en",
  });

  (useTranslation as jest.Mock).mockReturnValue({
    t: (key: string) => key,
    i18n: { language: "en", changeLanguage: jest.fn() },
  });

  (useToggleFavorite as jest.Mock).mockReturnValue({
    mutate: jest.fn(),
    isPending: false,
  });

  (useFavoriteServices as jest.Mock).mockReturnValue({
    data: favoriteServices,
  });

  (useServices as jest.Mock).mockReturnValue({
    data: services,
  });

  (useServicePath as jest.Mock).mockReturnValue(jest.fn());

  (generatePath as jest.Mock).mockImplementation((path, params) => {
    switch (path) {
      case ROUTES.HOME:
        return `/${params.lang}`;
      case ROUTES.SERVICES:
        return `/${params.lang}/services`;
      case ROUTES.SERVICES_CATEGORY:
        return `/${params.lang}/services/categories/${params.category}`;
      case ROUTES.SERVICE_ID:
        return `/${params.lang}/service/${params.id}`;
      case ROUTES.ABOUT_US:
        return `/${params.lang}/about-us`;
      case ROUTES.FOR_BUSINESS_PARTNERS:
        return `/${params.lang}/for-business-partners`;
      case ROUTES.LOGIN:
        return `/${params.lang}/auth/login`;
      case ROUTES.REGISTER:
        return `/${params.lang}/auth/register`;
      case ROUTES.BOOKINGS:
        return `/${params.lang}/bookings/user/${params.email}`;
      case ROUTES.BOOKINGS_FILTER:
        return `/${params.lang}/bookings/user/${params.email}/${params.status}`;
      case ROUTES.FAVORITES:
        return `/${params.lang}/services/user/${params.email}/favorites`;
      case ROUTES.FAVORITES_CATEGORY:
        return `/${params.lang}/services/user/${params.email}/favorites/${params.category}`;
      default:
        return path;
    }
  });
});

describe("ServicesContent", () => {
  const queryClient = new QueryClient();

  const renderWithProviders = (ui: JSX.Element) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MockUserContextProvider>{ui}</MockUserContextProvider>
      </QueryClientProvider>,
    );
  };

  it("renders the search input and categories", async () => {
    renderWithProviders(<ServicesContent />);

    expect(
      screen.getByPlaceholderText("inputPlaceholder.search"),
    ).toBeInTheDocument();
  });

  it("filters services based on search input", async () => {
    renderWithProviders(<ServicesContent />);

    const searchInput = screen.getByPlaceholderText("inputPlaceholder.search");
    fireEvent.change(searchInput, { target: { value: "Service 1" } });

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
    });
  });

  it("displays all services when search is cleared", async () => {
    renderWithProviders(<ServicesContent />);

    const searchInput = screen.getByPlaceholderText("inputPlaceholder.search");
    fireEvent.change(searchInput, { target: { value: "Service 1" } });
    fireEvent.change(searchInput, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
      expect(screen.getByText("Service 2")).toBeInTheDocument();
    });
  });

  it("filters services by category", async () => {
    (useParams as jest.Mock).mockReturnValueOnce({
      category: "Cleaning",
      lang: "en",
    });

    renderWithProviders(<ServicesContent />);

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
    });
  });

  it("displays favorite services correctly", async () => {
    renderWithProviders(<ServicesContent />);

    expect(screen.getByText("Service 1")).toBeInTheDocument();
  });

  it("handles category and language in the URL params (en)", async () => {
    (useParams as jest.Mock).mockReturnValueOnce({
      category: "Cleaning",
      lang: "en",
    });

    renderWithProviders(<ServicesContent />);

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
    });
  });
});
