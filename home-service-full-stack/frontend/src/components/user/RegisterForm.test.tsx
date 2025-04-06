import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate, useParams } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { useRegisterUser } from "./hooks";
import { IRegisterRequest } from "../user/types";
import { ErrorResponse } from "../types/error";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

jest.mock("notistack");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock("./hooks");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "errorMessage.en.errorMessage.required") {
        return "Field is required";
      }
      return key;
    },
  }),
}));

describe("RegisterForm", () => {
  const mockEnqueueSnackbar = jest.fn();
  const mockNavigate = jest.fn();
  const mockRegisterUser = jest.fn();

  beforeEach(() => {
    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ lang: "en" });
    (useRegisterUser as jest.Mock).mockReturnValue({
      mutateAsync: mockRegisterUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "common.register" }),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("inputPlaceholder.name"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("common.email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("common.password")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "common.register" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("forms.loginAndRegister.login"),
    ).toBeInTheDocument();
  });

  it("validates the form fields", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "common.register" }));

    await waitFor(() => {
      const errorMessages = screen.getAllByText("Field is required");
      expect(errorMessages).toHaveLength(3);
    });
  });

  it("submits the form successfully", async () => {
    const formValues: IRegisterRequest = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    mockRegisterUser.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("inputPlaceholder.name"), {
      target: { value: formValues.name },
    });
    fireEvent.change(screen.getByPlaceholderText("common.email"), {
      target: { value: formValues.email },
    });
    fireEvent.change(screen.getByPlaceholderText("common.password"), {
      target: { value: formValues.password },
    });

    fireEvent.click(screen.getByRole("button", { name: "common.register" }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith(formValues);
      expect(mockNavigate).toHaveBeenCalledWith("/en/auth/login");
      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
        "messages.registrationSuccess",
        {
          variant: "success",
        },
      );
    });
  });

  it("handles form submission error", async () => {
    const formValues: IRegisterRequest = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const errorResponse: ErrorResponse = {
      response: {
        data: {
          message: "Registration failed",
        },
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {
          headers: {
            Authorization: "Bearer mockToken",
          },
        },
      },
    } as AxiosError<{ message: string }>;

    mockRegisterUser.mockRejectedValueOnce(errorResponse);

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("inputPlaceholder.name"), {
      target: { value: formValues.name },
    });
    fireEvent.change(screen.getByPlaceholderText("common.email"), {
      target: { value: formValues.email },
    });
    fireEvent.change(screen.getByPlaceholderText("common.password"), {
      target: { value: formValues.password },
    });

    fireEvent.click(screen.getByRole("button", { name: "common.register" }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith(formValues);
      expect(mockEnqueueSnackbar).toHaveBeenCalledWith("Registration failed", {
        variant: "error",
      });
    });
  });
});
