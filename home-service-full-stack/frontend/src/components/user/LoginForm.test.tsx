import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "@/components/context/UserContext";
import LoginForm from "./LoginForm";
import { useLoginUser } from "./hooks";
import { ROUTES } from "@/constants/routes";

jest.mock("./hooks", () => ({
  useLoginUser: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

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
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    const mockLoginUser = (useLoginUser as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({ user: "test user" }),
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Log in"));

    await waitFor(() => {
      expect(mockLoginUser().mutateAsync).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
      expect(loginMock).toHaveBeenCalledWith({ user: "test user" });
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME);
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

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Log in"));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test("shows validation errors for empty fields", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Log in"));

    await waitFor(async () => {
      const errors = await screen.findAllByText("Field is required");
      expect(errors.length).toBe(2);
    });
  });
});
