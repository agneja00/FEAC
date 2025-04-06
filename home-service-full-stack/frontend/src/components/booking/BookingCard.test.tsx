import { render, screen, fireEvent } from "@testing-library/react";
import BookingCard from "./BookingCard";
import { IBooking } from "./types";
import { useDeleteBooking } from "./hooks";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useServicePath } from "../service/hooks";

jest.mock("./hooks", () => ({
  useDeleteBooking: jest.fn(),
}));

jest.mock("notistack", () => ({
  useSnackbar: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("../service/hooks", () => ({
  useServicePath: jest.fn(),
}));

describe("BookingCard", () => {
  const deleteBookingMock = jest.fn();
  const enqueueSnackbarMock = jest.fn();
  const navigateToServiceMock = jest.fn();

  const booking: IBooking = {
    _id: "1",
    serviceId: {
      _id: "service1",
      name: "Service 1",
      about: "About Service 1",
      address: "123 Main St",
      category: "Cleaning",
      contactPerson: "John Doe",
      email: "service1@example.com",
      imageUrls: ["image1.jpg"],
      favoritedBy: [],
      translations: {
        name: {
          en: "Service 1",
          lt: "Paslauga 1",
          ru: "Услуга 1",
        },
        about: {
          en: "About Service 1",
          lt: "Apie Paslaugą 1",
          ru: "О Услуге 1",
        },
        category: {
          en: "Cleaning",
          lt: "Valymas",
          ru: "Уборка",
        },
      },
    },
    date: new Date("2023-10-01"),
    time: "10:00 AM",
    userEmail: "user@example.com",
    userName: "User",
    status: "Confirmed",
    translations: {
      status: {
        en: "Confirmed",
        lt: "Patvirtinti",
        ru: "Подтверждено",
      },
    },
  };

  beforeEach(() => {
    (useDeleteBooking as jest.Mock).mockReturnValue({
      mutate: deleteBookingMock,
    });

    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: enqueueSnackbarMock,
    });

    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
      i18n: { language: "en" },
    });

    (useServicePath as jest.Mock).mockReturnValue(navigateToServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the booking details correctly", () => {
    render(<BookingCard booking={booking} />);

    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
    expect(screen.getByText("bookingCard.date")).toBeInTheDocument();
    expect(screen.getByText("10/1/2023")).toBeInTheDocument();
    expect(screen.getByText("bookingCard.time")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("buttons.cancel")).toBeInTheDocument();
  });

  it("calls deleteBooking when the cancel button is clicked", () => {
    render(<BookingCard booking={booking} />);

    fireEvent.click(screen.getByText("buttons.cancel"));

    expect(deleteBookingMock).toHaveBeenCalledWith("1");
    expect(enqueueSnackbarMock).toHaveBeenCalledWith("messages.bookCancel", {
      variant: "success",
    });
  });

  it("navigates to the service when the card is clicked", () => {
    render(<BookingCard booking={booking} />);

    fireEvent.click(
      screen.getByRole("button", { name: "buttons.cancel" }).parentElement!,
    );

    expect(navigateToServiceMock).toHaveBeenCalledWith("service1");
  });

  it("does not render the cancel button for completed bookings", () => {
    const completedBooking: IBooking = {
      ...booking,
      status: "Completed",
      translations: {
        status: {
          en: "Completed",
          lt: "Užbaigti",
          ru: "Завершено",
        },
      },
    };

    render(<BookingCard booking={completedBooking} />);

    expect(screen.queryByText("buttons.cancel")).not.toBeInTheDocument();
  });

  it("renders 'N/A' when date is missing", () => {
    const bookingWithoutDate: IBooking = {
      ...booking,
      date: null,
    };

    render(<BookingCard booking={bookingWithoutDate} />);

    expect(screen.getByText("common.na")).toBeInTheDocument();
  });
});
