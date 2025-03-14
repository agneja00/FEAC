import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { useUserBookings } from "@/components/booking/hooks";
import { useTranslation } from "react-i18next";
import BookingsPage from "./BookingsPage";
import FilteredList from "@/components/common/FilteredList";
import BookingCard from "@/components/booking/BookingCard";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
  generatePath: jest.fn(),
}));

jest.mock("@/components/booking/hooks", () => ({
  useUserBookings: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("@/components/common/FilteredList", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/components/booking/BookingCard", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseParams = useParams as jest.Mock;
const mockUseNavigate = useNavigate as jest.Mock;
const mockUseUserBookings = useUserBookings as jest.Mock;
const mockUseTranslation = useTranslation as jest.Mock;
const mockFilteredList = FilteredList as jest.Mock;
const mockBookingCard = BookingCard as jest.Mock;
const mockGeneratePath = generatePath as jest.Mock;

describe("BookingsPage", () => {
  const navigate = jest.fn();
  const t = jest.fn((key) => key);

  beforeEach(() => {
    mockUseParams.mockReturnValue({
      lang: "en",
      email: "test@example.com",
      status: "Confirmed",
    });
    mockUseNavigate.mockReturnValue(navigate);
    mockUseTranslation.mockReturnValue({ t });
    mockGeneratePath.mockImplementation((path, params) => {
      return `/en/bookings/${params.email}/${params.status}`;
    });

    mockFilteredList.mockImplementation(
      ({ title, items, filters, activeFilter, onFilterChange, renderItem }) => (
        <div>
          <h1>{title}</h1>
          <div>
            {filters.map((filter: string) => (
              <button key={filter} onClick={() => onFilterChange(filter)}>
                {filter}
              </button>
            ))}
          </div>
          <div>
            {items.length > 0 ? (
              items.map((item: any) => renderItem(item))
            ) : (
              <p>No items to display.</p>
            )}
          </div>
        </div>
      ),
    );

    mockBookingCard.mockImplementation(({ booking }) => (
      <div>{booking._id}</div>
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    mockUseUserBookings.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<BookingsPage />);
    expect(screen.getByText("common.loading")).toBeInTheDocument();
  });

  it("renders error state", () => {
    const error = new Error("Test error");
    mockUseUserBookings.mockReturnValue({
      isLoading: false,
      error,
      data: null,
    });

    render(<BookingsPage />);
    expect(screen.getByText("common.error: Test error")).toBeInTheDocument();
  });

  it("renders bookings list", async () => {
    const bookings = [
      {
        _id: "1",
        serviceId: "service1",
        date: new Date(),
        time: "10:00",
        status: "Confirmed",
        translations: { status: { en: "Confirmed" } },
      },
      {
        _id: "2",
        serviceId: "service2",
        date: new Date(),
        time: "12:00",
        status: "Completed",
        translations: { status: { en: "Completed" } },
      },
    ];
    mockUseUserBookings.mockReturnValue({
      isLoading: false,
      error: null,
      data: bookings,
    });

    render(<BookingsPage />);
    await waitFor(() =>
      expect(screen.getByText("accountModal.myBookings")).toBeInTheDocument(),
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("handles filter change", async () => {
    const bookings = [
      {
        _id: "1",
        serviceId: "service1",
        date: new Date(),
        time: "10:00",
        status: "Confirmed",
        translations: { status: { en: "Confirmed" } },
      },
    ];
    mockUseUserBookings.mockReturnValue({
      isLoading: false,
      error: null,
      data: bookings,
    });

    render(<BookingsPage />);
    await waitFor(() =>
      expect(screen.getByText("accountModal.myBookings")).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText("Completed"));
    expect(navigate).toHaveBeenCalledWith(
      "/en/bookings/test@example.com/Completed",
    );
  });
});
