import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
      if (path === ROUTES.HOME) return "/en";
      if (path === ROUTES.SERVICES) return "/en/services";
      if (path === ROUTES.ABOUT_US) return "/en/about-us";
      if (path === ROUTES.FOR_BUSINESS_PARTNERS)
        return "/en/for-business-partners";
      if (path === ROUTES.BOOKINGS_FILTER)
        return `/en/bookings/${params.email}/${params.status}`;
      if (path === ROUTES.FAVORITES)
        return `/en/services/${params.email}/favorites`;
      if (path === ROUTES.LOGIN) return "/en/auth/login";
      return path;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Topbar with navigation links", () => {
    render(
      <UserContext.Provider
        value={{ user: null, isLoggedIn: false, login: jest.fn(), logout }}
      >
        <Topbar />
      </UserContext.Provider>,
    );

    expect(screen.getByText("topbar.services")).toBeInTheDocument();
    expect(screen.getByText("common.aboutUs")).toBeInTheDocument();
    expect(screen.getByText("common.forBusinessPartners")).toBeInTheDocument();
  });

  it("renders the login button when user is not logged in", () => {
    render(
      <UserContext.Provider
        value={{ user: null, isLoggedIn: false, login: jest.fn(), logout }}
      >
        <Topbar />
      </UserContext.Provider>,
    );

    expect(screen.getByText("buttons.loginOrSign")).toBeInTheDocument();
  });

  it("renders the avatar and user menu when user is logged in", () => {
    render(
      <UserContext.Provider
        value={{ user, isLoggedIn: true, login: jest.fn(), logout }}
      >
        <Topbar />
      </UserContext.Provider>,
    );

    expect(screen.getByText(user.email[0])).toBeInTheDocument();
  });

  it("toggles the mobile menu when the menu icon is clicked", () => {
    render(
      <UserContext.Provider
        value={{ user: null, isLoggedIn: false, login: jest.fn(), logout }}
      >
        <Topbar />
      </UserContext.Provider>,
    );

    fireEvent.click(screen.getByLabelText("Open navigation menu"));
    expect(screen.getByLabelText("Close navigation menu")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Close navigation menu"));
    expect(screen.getByLabelText("Open navigation menu")).toBeInTheDocument();
  });
});
