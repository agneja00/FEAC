import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateAccountForm from "./UpdateAccountForm";
import { useUser, useUpdateUser } from "./hooks";
import { useSnackbar } from "notistack";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ lang: "en" }),
}));

jest.mock("./hooks");
jest.mock("notistack", () => ({
  useSnackbar: jest.fn(),
}));

describe("UpdateAccountForm (Jest)", () => {
  const enqueueSnackbarMock = jest.fn();
  const onSuccessMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useUser as jest.Mock).mockReturnValue({
      data: {
        name: "John",
        surname: "Doe",
        age: 30,
        country: "USA",
        city: "New York",
        email: "john@example.com",
        photo: null,
      },
      isLoading: false,
    });

    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: enqueueSnackbarMock,
    });

    global.URL.createObjectURL = jest.fn(() => "mock-preview-url");
    global.URL.revokeObjectURL = jest.fn();
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <UpdateAccountForm
          userEmail="john@example.com"
          onSuccess={onSuccessMock}
        />
      </BrowserRouter>,
    );

  it("renders form with pre-filled user data", () => {
    (useUpdateUser as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    });

    renderComponent();

    expect(screen.getByLabelText(/inputPlaceholder.name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/forms.updateAccount.surname/i)).toHaveValue(
      "Doe",
    );
    expect(screen.getByLabelText(/forms.updateAccount.age/i)).toHaveValue("30");
    expect(screen.getByLabelText(/forms.updateAccount.country/i)).toHaveValue(
      "USA",
    );
    expect(screen.getByLabelText(/forms.updateAccount.city/i)).toHaveValue(
      "New York",
    );
    expect(screen.getByLabelText(/common.email/i)).toHaveValue(
      "john@example.com",
    );

    expect(
      screen.getByLabelText(/forms.loginAndRegister.passwordNew/i),
    ).toHaveValue("");
    expect(
      screen.getByLabelText(/forms.loginAndRegister.passwordRepeat/i),
    ).toHaveValue("");
  });

  it("submits form and calls updateUser with new password and passwordRepeat", async () => {
    const updateUserMock = jest.fn().mockResolvedValue({
      name: "John",
      surname: "Doe",
      age: 30,
      country: "USA",
      city: "New York",
      email: "john@example.com",
      photo: null,
    });
    (useUpdateUser as jest.Mock).mockReturnValue({
      mutateAsync: updateUserMock,
    });

    renderComponent();

    fireEvent.change(
      screen.getByLabelText(/forms.loginAndRegister.passwordNew/i),
      {
        target: { value: "newpassword" },
      },
    );
    fireEvent.change(
      screen.getByLabelText(/forms.loginAndRegister.passwordRepeat/i),
      {
        target: { value: "newpassword" },
      },
    );

    fireEvent.click(screen.getByRole("button", { name: /buttons.update/i }));

    await waitFor(() =>
      expect(updateUserMock).toHaveBeenCalledWith(expect.any(FormData)),
    );

    const formDataArg = updateUserMock.mock.calls[0][0];
    expect(formDataArg.get("password")).toBe("newpassword");

    await waitFor(() => {
      expect(enqueueSnackbarMock).toHaveBeenCalledWith(
        "messages.updateSuccess",
        {
          variant: "success",
        },
      );
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });

  it("shows error message on update failure", async () => {
    const updateUserMock = jest.fn().mockRejectedValue({
      response: { data: { message: "Update failed" } },
    });
    (useUpdateUser as jest.Mock).mockReturnValue({
      mutateAsync: updateUserMock,
    });

    renderComponent();

    fireEvent.change(
      screen.getByLabelText(/forms.loginAndRegister.passwordNew/i),
      {
        target: { value: "errorpass" },
      },
    );
    fireEvent.change(
      screen.getByLabelText(/forms.loginAndRegister.passwordRepeat/i),
      {
        target: { value: "errorpass" },
      },
    );

    fireEvent.click(screen.getByRole("button", { name: /buttons.update/i }));

    await waitFor(() =>
      expect(enqueueSnackbarMock).toHaveBeenCalledWith("Update failed", {
        variant: "error",
      }),
    );
  });

  it("handles photo file input and displays preview", async () => {
    (useUpdateUser as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    });

    renderComponent();

    const file = new File(["dummy"], "avatar.png", { type: "image/png" });

    const input = screen.getByLabelText(
      /forms.updateAccount.photo/i,
    ) as HTMLInputElement;

    fireEvent.change(input, {
      target: { files: [file] },
    });

    await waitFor(() => {
      const img = screen.getByAltText("Preview") as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain("mock-preview-url");
    });
  });
});
