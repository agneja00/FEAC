import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "@/components/context/UserContext";
import LoginForm from "./LoginForm";
import { useLoginUser } from "./hooks";
import { ROUTES } from "@/constants/routes";
import { generatePath } from "react-router-dom";

jest.mock("./hooks", () => ({
  useLoginUser: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: "en" } }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  generatePath: jest.fn((path, params) => `/${params.lang}`),
}));

const mockNavigate = jest.fn();
const loginMock = jest.fn();

describe("LoginForm Component", () => {
  beforeEach(() => {
    (useLoginUser as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    });
  });

  const renderComponent = () =>
    render(
      <Router>
        <UserContext.Provider
          value={{
            login: loginMock,
            logout: jest.fn(),
            user: null,
            isLoggedIn: false,
          }}
        >
          <LoginForm />
        </UserContext.Provider>
      </Router>,
    );

  test("renders login form", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("common.email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("common.password")).toBeInTheDocument();
    expect(screen.getByText("buttons.login")).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    const mockLoginUser = (useLoginUser as jest.Mock).mockReturnValue({
      mutateAsync: jest
        .fn()
        .mockResolvedValue({ data: { token: "mock-token" } }),
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("common.email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("common.password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("buttons.login"));

    await waitFor(() => {
      expect(mockLoginUser().mutateAsync).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(loginMock).toHaveBeenCalledWith({ token: "mock-token" });
      expect(mockNavigate).toHaveBeenCalledWith(
        generatePath(ROUTES.HOME, { lang: "en" }),
      );
    });
  });

  test("displays error message on failed login", async () => {
    const errorMessage = "Invalid credentials";
    (useLoginUser as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockRejectedValue({
        response: { data: { message: errorMessage } },
      }),
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("common.email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("common.password"), {
      target: { value: "password123" },
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
});
