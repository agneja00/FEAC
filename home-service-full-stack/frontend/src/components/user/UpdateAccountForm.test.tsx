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
  const updateUserMock = jest.fn();
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
      },
      isLoading: false,
    });

    (useUpdateUser as jest.Mock).mockReturnValue({
      mutateAsync: updateUserMock,
    });

    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: enqueueSnackbarMock,
    });

    global.URL.createObjectURL = jest.fn(() => "mock-preview-url");
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
    renderComponent();

    expect(screen.getByLabelText(/inputPlaceholder.name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/forms.updateAccount.surname/i)).toHaveValue(
      "Doe",
    );
    expect(screen.getByLabelText(/forms.updateAccount.age/i)).toHaveValue(30);
    expect(screen.getByLabelText(/forms.updateAccount.country/i)).toHaveValue(
      "USA",
    );
    expect(screen.getByLabelText(/forms.updateAccount.city/i)).toHaveValue(
      "New York",
    );
    expect(screen.getByLabelText(/common.email/i)).toHaveValue(
      "john@example.com",
    );
  });

  it("submits form and calls updateUser", async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/common.password/i), {
      target: { value: "newpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /buttons.update/i }));

    await waitFor(() =>
      expect(updateUserMock).toHaveBeenCalledWith(expect.any(FormData)),
    );

    expect(enqueueSnackbarMock).toHaveBeenCalledWith("messages.updateSuccess", {
      variant: "success",
    });

    expect(onSuccessMock).toHaveBeenCalled();
  });

  it("shows error message on update failure", async () => {
    (useUpdateUser as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockRejectedValue({
        response: { data: { message: "Update failed" } },
      }),
    });

    renderComponent();

    fireEvent.change(screen.getByLabelText(/common.password/i), {
      target: { value: "errorpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /buttons.update/i }));

    await waitFor(() =>
      expect(enqueueSnackbarMock).toHaveBeenCalledWith("Update failed", {
        variant: "error",
      }),
    );
  });

  it("handles photo file input and displays preview", async () => {
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
