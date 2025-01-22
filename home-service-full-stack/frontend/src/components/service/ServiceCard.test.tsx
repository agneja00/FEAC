import { render, screen, fireEvent } from "@testing-library/react";
import ServiceCard from "./ServiceCard";
import { Service } from "./types";

const mockService: Service = {
  _id: "1",
  about: "test",
  email: "test@gmail.com",
  imageUrls: ["https://example.com/image.jpg"],
  name: "Test Service",
  category: "Restaurant",
  contactPerson: "John Doe",
  address: "123 Test Street",
  favorite: false,
};

const mockServiceWithoutImage: Service = {
  ...mockService,
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

describe("<ServiceCard />", () => {
  test("should navigate to service page when 'Book now' is clicked", () => {
    render(<ServiceCard service={mockService} />);

    const bookNowButton = screen.getByText(/Book now/i);

    fireEvent.click(bookNowButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/service/${mockService._id}`);
  });

  test("renders Service Card with all details", () => {
    render(<ServiceCard service={mockService} />);

    expect(screen.getByAltText("Test Service")).toBeInTheDocument();
    expect(screen.getByText("Restaurant")).toBeInTheDocument();
    expect(screen.getByText("Test Service")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123 Test Street")).toBeInTheDocument();
    expect(screen.getByText("Book now")).toBeInTheDocument();
  });

  test("does not render image if imageUrls array is empty", () => {
    render(<ServiceCard service={mockServiceWithoutImage} />);

    expect(screen.queryByAltText("Test Service")).not.toBeInTheDocument();
  });

  test("renders the 'Book now' button", () => {
    render(<ServiceCard service={mockService} />);

    expect(
      screen.getByRole("button", { name: /Book now/i }),
    ).toBeInTheDocument();
  });
});
