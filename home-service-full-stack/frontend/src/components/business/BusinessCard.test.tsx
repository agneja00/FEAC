import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import BusinessCard from "./BusinessCard";
import { Business } from "./types";

const mockBusiness: Business = {
  _id: "1",
  about: "test",
  email: "test@gmail.com",
  imageUrls: ["https://example.com/image.jpg"],
  name: "Test Business",
  category: "Restaurant",
  contactPerson: "John Doe",
  address: "123 Test Street",
  favorite: false,
};

const mockBusinessWithoutImage: Business = {
  ...mockBusiness,
  imageUrls: [],
};

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("usehooks-ts", () => ({
  useLocalStorage: jest.fn(() => [[], jest.fn()]),
}));

test("should navigate to business page when 'Book now' is clicked", () => {
  const mockNavigate = useNavigate() as jest.Mock;
  render(<BusinessCard business={mockBusiness} />);

  const bookNowButton = screen.getByText(/Book now/i);

  fireEvent.click(bookNowButton);

  expect(mockNavigate).toHaveBeenCalledWith(`/business/${mockBusiness._id}`); // Assert it navigated to the correct URL
});

describe("<BusinessCard />", () => {
  test("renders Business Card with all details", () => {
    render(<BusinessCard business={mockBusiness} />);

    expect(screen.getByAltText("Test Business")).toBeInTheDocument();
    expect(screen.getByText("Restaurant")).toBeInTheDocument();
    expect(screen.getByText("Test Business")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123 Test Street")).toBeInTheDocument();
    expect(screen.getByText("Book now")).toBeInTheDocument();
  });

  test("does not render image if imageUrls array is empty", () => {
    render(<BusinessCard business={mockBusinessWithoutImage} />);

    expect(screen.queryByAltText("Test Business")).not.toBeInTheDocument();
  });

  test("renders the 'Book now' button", () => {
    render(<BusinessCard business={mockBusiness} />);

    expect(
      screen.getByRole("button", { name: /Book now/i })
    ).toBeInTheDocument();
  });
});
