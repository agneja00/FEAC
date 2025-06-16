import { render, screen, fireEvent } from "@testing-library/react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { UserContext } from "@/components/context/UserContext";
import { useTranslation } from "react-i18next";
import Topbar from "./Topbar";
import { ROUTES } from "@/constants/routes";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
  generatePath: jest.fn(),
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("../common/LanguageSwither", () => ({
  __esModule: true,
  default: jest.fn(() => <div>LanguageSwitcher</div>),
}));

jest.mock("@/components/common/Modal", () => ({
  __esModule: true,
  default: jest.fn(({ isOpen, children }) =>
    isOpen ? <div>{children}</div> : null,
  ),
}));

const mockUseParams = useParams as jest.Mock;
const mockUseNavigate = useNavigate as jest.Mock;
const mockGeneratePath = generatePath as jest.Mock;
const mockUseTranslation = useTranslation as jest.Mock;

describe("Topbar", () => {
  const navigate = jest.fn();
  const t = jest.fn((key) => key);
  const logout = jest.fn();
  const setUser = jest.fn();

  const user = {
    _id: "123",
    name: "Test User",
    email: "test@example.com",
  };

  beforeEach(() => {
    mockUseParams.mockReturnValue({ lang: "en" });
    mockUseNavigate.mockReturnValue(navigate);
    mockUseTranslation.mockReturnValue({ t });

    mockGeneratePath.mockImplementation((path, params) => {
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
        case ROUTES.ACCOUNT:
          return `/${params.lang}/user/${params.email}`;
        case ROUTES.BOOKINGS:
          return `/${params.lang}/bookings/user/${params.email}`;
        case ROUTES.BOOKINGS_FILTER:
          return `/${params.lang}/bookings/user/${params.email}/${params.status}`;
        case ROUTES.FAVORITES:
          return `/${params.lang}/services/user/${params.email}/favorites`;
        case ROUTES.FAVORITES_CATEGORY:
          return `/${params.lang}/services/user/${params.email}/favorites/${params.category}`;
        case ROUTES.ERROR_LANG:
          return `/${params.lang}/error`;
        case ROUTES.ERROR_GLOBAL:
          return `/error`;
        default:
          return "/";
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithUserContext = (
    ctxValue: React.ContextType<typeof UserContext>,
  ) => {
    return render(
      <UserContext.Provider value={ctxValue}>
        <Topbar />
      </UserContext.Provider>,
    );
  };

  it("renders the Topbar with navigation links", () => {
    renderWithUserContext({
      user: null,
      isLoggedIn: false,
      login: jest.fn(),
      logout,
      setUser,
    });

    expect(screen.getByText("topbar.services")).toBeInTheDocument();
    expect(screen.getByText("common.aboutUs")).toBeInTheDocument();
    expect(screen.getByText("common.forBusinessPartners")).toBeInTheDocument();
  });

  it("renders the login button when user is not logged in", () => {
    renderWithUserContext({
      user: null,
      isLoggedIn: false,
      login: jest.fn(),
      logout,
      setUser,
    });

    expect(screen.getByText("buttons.loginOrSign")).toBeInTheDocument();
  });

  it("renders the avatar and user menu when user is logged in", () => {
    renderWithUserContext({
      user,
      isLoggedIn: true,
      login: jest.fn(),
      logout,
      setUser,
    });

    expect(screen.getByText(user.email[0])).toBeInTheDocument();
  });

  it("toggles the mobile menu when the menu icon is clicked", () => {
    renderWithUserContext({
      user: null,
      isLoggedIn: false,
      login: jest.fn(),
      logout,
      setUser,
    });

    const openMenuButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(openMenuButton);

    const closeMenuButton = screen.getByLabelText("Close navigation menu");
    expect(closeMenuButton).toBeInTheDocument();

    fireEvent.click(closeMenuButton);
    expect(screen.getByLabelText("Open navigation menu")).toBeInTheDocument();
  });
});
