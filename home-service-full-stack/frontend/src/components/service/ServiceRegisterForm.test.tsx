import { render, screen, waitFor } from "@testing-library/react";
import ServiceRegisterForm from "./ServiceRegisterForm";
import { sendServiceEmail } from "./api";
import { useSnackbar } from "notistack";
import userEvent from "@testing-library/user-event";
import { SnackbarProvider } from "notistack";

jest.mock("./api", () => ({
  sendServiceEmail: jest.fn(),
}));

jest.mock("notistack", () => ({
  useSnackbar: jest.fn(),
  SnackbarProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "forms.registerService.title":
          "Let’s Work Together to Serve More Homes!",
        "forms.registerService.serviceName": "Service name:",
        "forms.registerService.description": "Description of your service:",
        "forms.registerService.companyAddress": "Company address:",
        "forms.registerService.category": "Category:",
        "forms.registerService.select": "Select a category",
        "forms.registerService.contact": "Contact person:",
        "common.email": "Email",
        "buttons.completeTheForm": "Complete the Form",
        "categories.shifting": "Shifting",
        "categories.repair": "Repair",
        "categories.plumbing": "Plumbing",
        "categories.cleaning": "Cleaning",
        "categories.painting": "Painting",
        "categories.electric": "Electric",
        "categories.decoration": "Decoration",
        "messages.emailSendSuccess": "Email sent successfully!",
        "messages.emailSendError": "Failed to send email.",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ lang: "en" }),
}));

describe("ServiceRegisterForm", () => {
  const enqueueSnackbar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSnackbar as jest.Mock).mockReturnValue({ enqueueSnackbar });
  });

  it("shows an error message when submission fails", async () => {
    const mockError = new Error("Failed to send email.");
    (sendServiceEmail as jest.Mock).mockRejectedValueOnce(mockError);

    render(
      <SnackbarProvider>
        <ServiceRegisterForm />
      </SnackbarProvider>,
    );

    await userEvent.type(
      screen.getByLabelText(/service name:/i),
      "Test Service",
    );
    await userEvent.type(
      screen.getByLabelText(/description of your service:/i),
      "Test Description",
    );
    await userEvent.type(
      screen.getByLabelText(/company address:/i),
      "Test Address",
    );
    await userEvent.selectOptions(
      screen.getByLabelText(/category:/i),
      "Shifting",
    );
    await userEvent.type(
      screen.getByLabelText(/contact person:/i),
      "Test Contact",
    );
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");

    await userEvent.click(screen.getByText(/complete the form/i));

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith("Failed to send email.", {
        variant: "error",
      });
    });
  });

  it("shows a success message when submission succeeds", async () => {
    (sendServiceEmail as jest.Mock).mockResolvedValueOnce({});

    render(
      <SnackbarProvider>
        <ServiceRegisterForm />
      </SnackbarProvider>,
    );

    await userEvent.type(
      screen.getByLabelText(/service name:/i),
      "Test Service",
    );
    await userEvent.type(
      screen.getByLabelText(/description of your service:/i),
      "Test Description",
    );
    await userEvent.type(
      screen.getByLabelText(/company address:/i),
      "Test Address",
    );
    await userEvent.selectOptions(
      screen.getByLabelText(/category:/i),
      "Shifting",
    );
    await userEvent.type(
      screen.getByLabelText(/contact person:/i),
      "Test Contact",
    );
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");

    await userEvent.click(screen.getByText(/complete the form/i));

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith("Email sent successfully!", {
        variant: "success",
      });
    });
  });
});
