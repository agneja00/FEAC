import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ServicePage from "./ServicePage";
import { UserContext } from "@/components/context/UserContext";
import { useCurrentService, useServices } from "@/components/service/hooks";
import { useAddBooking } from "@/components/booking/hooks";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@/components/service/hooks");
jest.mock("@/components/booking/hooks");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockUser = {
  _id: "user1",
  name: "Test User",
  email: "test@example.com",
};

const mockCurrentService = {
  _id: "service123",
  name: "Test Service",
  category: "Cleaning",
  imageUrls: ["https://example.com/image.jpg"],
  contactPerson: "John Doe",
  address: "123 Main St",
};

const mockSimilarServices = [
  {
    _id: "456",
    name: "Similar Service 1",
    category: "Cleaning",
    imageUrls: ["https://example.com/image1.jpg"],
    contactPerson: "Jane Doe",
    address: "456 Similar St",
  },
  {
    _id: "789",
    name: "Similar Service 2",
    category: "Cleaning",
    imageUrls: ["https://example.com/image2.jpg"],
    contactPerson: "John Smith",
    address: "789 Similar St",
  },
];

beforeEach(() => {
  (useCurrentService as jest.Mock).mockReturnValue({
    currentService: mockCurrentService,
  });

  (useServices as jest.Mock).mockReturnValue({
    data: mockSimilarServices,
  });

  (useAddBooking as jest.Mock).mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValue({}),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

const queryClient = new QueryClient();

const renderWithProviders = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/en/service/service123"]}>
        <UserContext.Provider
          value={{
            user: mockUser,
            isLoggedIn: true,
            login: jest.fn(),
            logout: jest.fn(),
          }}
        >
          <SnackbarProvider>
            <Routes>
              <Route path="/:lang/service/:id" element={<ServicePage />} />
            </Routes>
          </SnackbarProvider>
        </UserContext.Provider>
      </MemoryRouter>
    </QueryClientProvider>,
  );

describe("ServicePage booking date validation", () => {
  it("shows warning if booking submitted without selecting a date", async () => {
    renderWithProviders();

    fireEvent.click(screen.getByText("buttons.bookAppointment"));
    fireEvent.click(screen.getByText("buttons.reserveTime"));

    expect(
      await screen.findByText("messages.selectBookingDate"),
    ).toBeInTheDocument();
  });

  it("shows error when booking with a past date", async () => {
    renderWithProviders();

    fireEvent.click(screen.getByText("buttons.bookAppointment"));

    const prevMonthButton = screen.getByLabelText("Previous month");
    fireEvent.click(prevMonthButton);

    const calendar = screen.getByRole("grid");
    const dateButtons = Array.from(calendar.querySelectorAll("button")).filter(
      (btn) => !btn.disabled,
    );

    if (dateButtons.length === 0) {
      throw new Error("No date buttons found in calendar");
    }

    fireEvent.click(dateButtons[0]);
    fireEvent.click(screen.getByText("time.10AM"));
    fireEvent.click(screen.getByText("buttons.reserveTime"));

    expect(
      await screen.findByText("messages.pastDateError"),
    ).toBeInTheDocument();
  });

  it("shows warning if booking submitted without selecting a time", async () => {
    renderWithProviders();

    fireEvent.click(screen.getByText("buttons.bookAppointment"));

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.getDate().toString();

    const calendar = screen.getByRole("grid");
    const futureBtn = Array.from(calendar.querySelectorAll("button")).find(
      (btn) => btn.textContent?.trim() === tomorrowDate,
    );

    if (!futureBtn) throw new Error("No future date button found in calendar");

    fireEvent.click(futureBtn);
    fireEvent.click(screen.getByText("buttons.reserveTime"));

    expect(
      await screen.findByText("messages.selectBookingTime"),
    ).toBeInTheDocument();
  });

  it("submits successfully when valid date and time are selected", async () => {
    renderWithProviders();

    fireEvent.click(screen.getByText("buttons.bookAppointment"));

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.getDate().toString();

    const calendar = screen.getByRole("grid");
    const futureBtn = Array.from(calendar.querySelectorAll("button")).find(
      (btn) => btn.textContent?.trim() === tomorrowDate,
    );

    if (!futureBtn) throw new Error("No future date button found in calendar");

    fireEvent.click(futureBtn);
    fireEvent.click(screen.getByText("time.10AM"));
    fireEvent.click(screen.getByText("buttons.reserveTime"));

    await waitFor(() =>
      expect(screen.getByText("messages.bookSuccess")).toBeInTheDocument(),
    );
  });
});

describe("ServicePage SimilarService section", () => {
  it("renders the similar services section correctly", () => {
    renderWithProviders();

    expect(screen.getByText("servicePage.similarServices")).toBeInTheDocument();
    expect(screen.getByText("Similar Service 1")).toBeInTheDocument();
    expect(screen.getByText("Similar Service 2")).toBeInTheDocument();
  });

  it("does not render the current service in the similar services list", () => {
    renderWithProviders();

    const similarSection = screen.getByText(
      "servicePage.similarServices",
    ).parentElement;
    expect(similarSection).toBeTruthy();

    if (similarSection) {
      const insideSimilar = within(similarSection);
      expect(insideSimilar.queryByText("Test Service")).not.toBeInTheDocument();
    }
  });
});
