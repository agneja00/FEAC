import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "@/components/context/UserContext";
import FavoritesPage from "./FavoritesPage";
import { useFavoriteServices } from "@/components/service/hooks";
import { ServiceWithFavorite } from "@/components/service/types";
import { IUser } from "@/components/user/types";
import { ROUTES } from "@/constants/routes";

jest.mock("@/components/service/hooks", () => ({
  useFavoriteServices: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/components/common/FilteredList", () => ({
  __esModule: true,
  default: jest.fn(({ title, items, renderItem }) => (
    <div>
      <h1>{title}</h1>
      <div>{items.map((item: any) => renderItem(item))}</div>
    </div>
  )),
}));

jest.mock("@/components/service/ServiceCard", () => ({
  __esModule: true,
  default: jest.fn(({ service }) => <div>{service.name}</div>),
}));

const mockUser: IUser = {
  _id: "12345",
  name: "Test User",
  email: "test@example.com",
};

const mockServices: ServiceWithFavorite[] = [
  {
    _id: "1",
    name: "Service 1",
    category: "Cleaning",
    about: "About Service 1",
    address: "123 Main St",
    contactPerson: "John Doe",
    email: "service1@example.com",
    imageUrls: ["https://example.com/image1.jpg"],
    translations: {
      name: { en: "Service 1", lt: "Paslauga 1", ru: "Услуга 1" },
      about: {
        en: "About Service 1",
        lt: "Apie paslaugą 1",
        ru: "Об услуге 1",
      },
      category: { en: "Cleaning", lt: "Valymas", ru: "Уборка" },
    },
    isFavorite: true,
    favoritedBy: ["test@example.com"],
  },
  {
    _id: "2",
    name: "Service 2",
    category: "Repair",
    about: "About Service 2",
    address: "456 Elm St",
    contactPerson: "Jane Smith",
    email: "service2@example.com",
    imageUrls: ["https://example.com/image2.jpg"],
    translations: {
      name: { en: "Service 2", lt: "Paslauga 2", ru: "Услуга 2" },
      about: {
        en: "About Service 2",
        lt: "Apie paslaugą 2",
        ru: "Об услуге 2",
      },
      category: { en: "Repair", lt: "Remontas", ru: "Ремонт" },
    },
    isFavorite: true,
    favoritedBy: ["test@example.com"],
  },
];

describe("FavoritesPage", () => {
  beforeEach(() => {
    (useFavoriteServices as jest.Mock).mockReturnValue({
      data: mockServices,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (route: string, user: IUser | null = mockUser) => {
    return render(
      <UserContext.Provider
        value={{
          user,
          isLoggedIn: !!user,
          login: jest.fn(),
          logout: jest.fn(),
          setUser: jest.fn(),
        }}
      >
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
            <Route
              path={ROUTES.FAVORITES_CATEGORY}
              element={<FavoritesPage />}
            />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>,
    );
  };

  it("renders the favorites page with all services when no category is selected", async () => {
    renderComponent("/en/services/user/test@example.com/favorites");

    await waitFor(() => {
      expect(screen.getByText("accountModal.myFavorites")).toBeInTheDocument();
      expect(screen.getByText("Service 1")).toBeInTheDocument();
      expect(screen.getByText("Service 2")).toBeInTheDocument();
    });
  });

  it("renders the favorites page with filtered services when a category is selected", async () => {
    renderComponent("/en/services/user/test@example.com/favorites/Cleaning");

    await waitFor(() => {
      expect(screen.getByText("accountModal.myFavorites")).toBeInTheDocument();
      expect(screen.getByText("Service 1")).toBeInTheDocument();
      expect(screen.queryByText("Service 2")).not.toBeInTheDocument();
    });
  });

  it("displays a loading message when data is being fetched", async () => {
    (useFavoriteServices as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderComponent("/en/services/user/test@example.com/favorites");

    await waitFor(() => {
      expect(screen.getByText("messages.favoritesLoading")).toBeInTheDocument();
    });
  });

  it("displays an error message when there is an error fetching data", async () => {
    (useFavoriteServices as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    renderComponent("/en/services/user/test@example.com/favorites");

    await waitFor(() => {
      expect(screen.getByText("messages.favoritesError")).toBeInTheDocument();
    });
  });

  it("displays a message when the user is not logged in", async () => {
    render(
      <UserContext.Provider
        value={{
          user: null,
          isLoggedIn: false,
          login: jest.fn(),
          logout: jest.fn(),
          setUser: jest.fn(),
        }}
      >
        <MemoryRouter
          initialEntries={["/en/services/user/test@example.com/favorites"]}
        >
          <Routes>
            <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("messages.favoritesLogin")).toBeInTheDocument();
    });
  });
});
