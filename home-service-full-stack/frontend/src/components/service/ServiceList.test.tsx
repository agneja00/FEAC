import { render, screen } from "@testing-library/react";
import ServiceList from "./ServiceList";
import ServiceCard from "./ServiceCard";
import { Service } from "./types";

jest.mock("./ServiceCard", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mocked-service-card">Mocked ServiceCard</div>
  )),
}));

const mockServices: Service[] = [
  {
    _id: "1",
    name: "Service 1",
    about: "About Service 1",
    address: "Address 1",
    category: "Category 1",
    contactPerson: "Contact Person 1",
    email: "email1@example.com",
    imageUrls: ["image1.jpg"],
    favoritedBy: ["user1"],
  },
  {
    _id: "2",
    name: "Service 2",
    about: "About Service 2",
    address: "Address 2",
    category: "Category 2",
    contactPerson: "Contact Person 2",
    email: "email2@example.com",
    imageUrls: ["image2.jpg"],
    favoritedBy: [],
  },
];

const mockFavoriteServices: Service[] = [
  {
    _id: "1",
    name: "Service 1",
    about: "About Service 1",
    address: "Address 1",
    category: "Category 1",
    contactPerson: "Contact Person 1",
    email: "email1@example.com",
    imageUrls: ["image1.jpg"],
    favoritedBy: ["user1"],
  },
];

it("renders the correct number of ServiceCard components", () => {
  render(<ServiceList services={mockServices} />);
  const serviceCards = screen.getAllByTestId("mocked-service-card");
  expect(serviceCards).toHaveLength(mockServices.length);
});

it("passes the correct props to ServiceCard", () => {
  render(
    <ServiceList
      services={mockServices}
      favoriteServices={mockFavoriteServices}
    />,
  );

  expect(ServiceCard).toHaveBeenCalledWith(
    expect.objectContaining({
      service: mockServices[0],
      isFavorite: true,
    }),
    expect.anything(),
  );

  expect(ServiceCard).toHaveBeenCalledWith(
    expect.objectContaining({
      service: mockServices[1],
      isFavorite: false,
    }),
    expect.anything(),
  );
});

it("renders an empty container when services are not provided", () => {
  const { container } = render(<ServiceList />);
  expect(container.firstChild).toBeEmptyDOMElement();
});
