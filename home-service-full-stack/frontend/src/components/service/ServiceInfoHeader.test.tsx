import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServiceInfoHeader from "./ServiceInfoHeader";
import { useCurrentService } from "./hooks";
import { useSnackbar } from "notistack";

jest.mock("./hooks");
jest.mock("notistack");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ServiceInfoHeader", () => {
  const mockCurrentService = {
    _id: "123",
    name: "Test Service",
    category: "Cleaning",
    address: "123 Test St",
    email: "test@example.com",
    contactPerson: "John Doe",
    imageUrls: ["https://example.com/image.jpg"],
  };

  const mockEnqueueSnackbar = jest.fn();

  beforeEach(() => {
    (useCurrentService as jest.Mock).mockReturnValue({
      currentService: mockCurrentService,
    });
    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the service info header correctly", () => {
    render(
      <MemoryRouter>
        <ServiceInfoHeader />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Service")).toBeInTheDocument();
    expect(screen.getByText("Cleaning")).toBeInTheDocument();
    expect(screen.getByText("123 Test St")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("servicePage.available")).toBeInTheDocument();
  });

  it("handles the share button click successfully", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });

    render(
      <MemoryRouter>
        <ServiceInfoHeader />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        `${window.location.origin}/service/123`,
      );

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
        "messages.copyLinkSuccess",
        {
          variant: "success",
        },
      );
    });
  });

  it("handles the share button click error", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockRejectedValue(new Error("Failed to copy")),
      },
    });

    render(
      <MemoryRouter>
        <ServiceInfoHeader />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        `${window.location.origin}/service/123`,
      );

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
        "messages.copyLinkError",
        {
          variant: "error",
        },
      );
    });
  });

  it("does not render if currentService is undefined", () => {
    (useCurrentService as jest.Mock).mockReturnValue({
      currentService: undefined,
    });

    render(
      <MemoryRouter>
        <ServiceInfoHeader />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Test Service")).not.toBeInTheDocument();
  });
});
