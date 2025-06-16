import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "@/components/context/UserContext";
import LoginForm from "./LoginForm";
import { useLoginUser } from "./hooks";
import { ROUTES } from "@/constants/routes";

jest.mock("./hooks", () => ({
  useLoginUser: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: "en" } }),
}));

const mockNavigate = jest.fn();
const mockLogin = jest.fn();
const mockSetUser = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ lang: "en" }),
    generatePath: jest.fn((path, params) => {
      switch (path) {
        case ROUTES.HOME:
          return `/${params.lang}`;
        case ROUTES.REGISTER:
          return `/${params.lang}/auth/register`;
        default:
          return "/";
      }
    }),
  };
});

describe("LoginForm Component", () => {
  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    (useLoginUser as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Router>
        <UserContext.Provider
          value={{
            login: mockLogin,
            logout: jest.fn(),
            setUser: mockSetUser,
            user: null,
            isLoggedIn: false,
          }}
        >
          <LoginForm />
        </UserContext.Provider>
      </Router>
    );

  test("renders login form fields and button", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("common.email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("common.password")).toBeInTheDocument();
    expect(screen.getByText("buttons.login")).toBeInTheDocument();
  });

  test("submits form with valid data and navigates", async () => {
    const mockUser = { _id: "1", name: "Test User", email: "test@example.com" };
    const mockToken = "mock-token";
    const mockResponse = { data: { user: mockUser, token: mockToken } };

    mockMutateAsync.mockResolvedValue(mockResponse);

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("common.email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("common.password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("buttons.login"));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(mockLogin).toHaveBeenCalledWith(mockResponse.data);
      expect(mockNavigate).toHaveBeenCalledWith("/en");
    });
  });

  test("displays error message on failed login", async () => {
    const errorMessage = "Invalid credentials";

    mockMutateAsync.mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("common.email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("common.password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByText("buttons.login"));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test("shows validation errors for empty fields", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("buttons.login"));

    await waitFor(async () => {
      const errors = await screen.findAllByText("Field is required");
      expect(errors.length).toBe(2);
    });
  });

  test("renders sign up link with correct path", () => {
    renderComponent();

    const signUpLink = screen.getByRole("link", {
      name: "forms.loginAndRegister.sign",
    });

    expect(signUpLink).toHaveAttribute("href", "/en/auth/register");
  });
});
