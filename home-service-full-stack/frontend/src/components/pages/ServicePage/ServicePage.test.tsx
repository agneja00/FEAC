import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ServicePage from "./ServicePage";
import { UserContext } from "@/components/context/UserContext";
import { useCurrentService, useServices } from "@/components/service/hooks";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@/components/service/hooks");
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
    </QueryClientProvider>
  );

describe("ServicePage booking date validation", () => {
  it("shows warning if booking submitted without selecting a date", async () => {
    renderWithProviders();

    fireEvent.click(screen.getByText("buttons.bookAppointment"));

    const reserveBtn = screen.getByText("buttons.reserveTime");
    fireEvent.click(reserveBtn);

    expect(
      await screen.findByText("messages.selectBookingDate")
    ).toBeInTheDocument();
  });

  it("shows error when booking with a past date", async () => {
    renderWithProviders();

    fireEvent.click(screen.getByText("buttons.bookAppointment"));

    const reserveBtn = screen.getByText("buttons.reserveTime");
    fireEvent.click(reserveBtn);
    expect(
      await screen.findByText("messages.selectBookingDate")
    ).toBeInTheDocument();
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
      "servicePage.similarServices"
    ).parentElement;
    expect(similarSection).toBeTruthy();

    if (similarSection) {
      const insideSimilar = within(similarSection);
      expect(insideSimilar.queryByText("Test Service")).not.toBeInTheDocument();
    }
  });
});
