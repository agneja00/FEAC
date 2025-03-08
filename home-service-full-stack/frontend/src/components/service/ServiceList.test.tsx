import { render, screen } from "@testing-library/react";
import ServiceList from "./ServiceList";
import ServiceCard from "./ServiceCard";
import { ServiceWithFavorite } from "./types";

jest.mock("./ServiceCard", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mocked-service-card">Mocked ServiceCard</div>
  )),
}));

const mockServices: ServiceWithFavorite[] = [
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
    translations: {
      name: { en: "Service 1", lt: "Paslauga 1", ru: "Услуга 1" },
      about: {
        en: "About Service 1",
        lt: "Apie paslaugą 1",
        ru: "Об услуге 1",
      },
      category: { en: "Category 1", lt: "Kategorija 1", ru: "Категория 1" },
    },
    isFavorite: true,
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
    translations: {
      name: { en: "Service 2", lt: "Paslauga 2", ru: "Услуга 2" },
      about: {
        en: "About Service 2",
        lt: "Apie paslaugą 2",
        ru: "Об услуге 2",
      },
      category: { en: "Category 2", lt: "Kategorija 2", ru: "Категория 2" },
    },
    isFavorite: false,
  },
];

describe("ServiceList", () => {
  it("renders the correct number of ServiceCard components", () => {
    render(<ServiceList services={mockServices} />);
    const serviceCards = screen.getAllByTestId("mocked-service-card");
    expect(serviceCards).toHaveLength(mockServices.length);
  });

  it("passes the correct props to ServiceCard", () => {
    render(<ServiceList services={mockServices} />);

    expect(ServiceCard).toHaveBeenCalledWith(
      expect.objectContaining({
        service: mockServices[0],
        isFavorite: mockServices[0].isFavorite,
      }),
      expect.anything(),
    );

    expect(ServiceCard).toHaveBeenCalledWith(
      expect.objectContaining({
        service: mockServices[1],
        isFavorite: mockServices[1].isFavorite,
      }),
      expect.anything(),
    );
  });

  it("renders an empty container when services are not provided", () => {
    const { container } = render(<ServiceList services={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
