import { render, screen } from "@testing-library/react";
import ServiceList from "./ServiceList";
import { Service } from "./types";
import { useServices } from "./hooks";
import { MemoryRouter } from "react-router-dom";

jest.mock("./hooks");

const mockServices: Service[] = [
  {
    _id: "1",
    imageUrls: ["https://example.com/image1.jpg"],
    name: "Service 1",
    category: "Restaurant",
    contactPerson: "John Doe",
    address: "123 Street A",
    email: "business@gmail.com",
    about: "good restaurant",
    favoritedBy: ["ajfofj@mail.ru"],
  },
  {
    _id: "2",
    imageUrls: ["https://example.com/image2.jpg"],
    name: "Service 2",
    category: "Retail",
    contactPerson: "Jane Smith",
    address: "456 Street B",
    email: "business1@gmail.com",
    about: "good retail business",
    favoritedBy: [""],
  },
];

describe("ServiceList Component", () => {
  beforeEach(() => {
    (useServices as jest.Mock).mockReturnValue({ data: mockServices });
  });

  test("renders a list of services", () => {
    render(
      <MemoryRouter>
        <ServiceList />
      </MemoryRouter>,
    );

    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.getByText("Service 2")).toBeInTheDocument();
  });

  test("filters services by category", () => {
    render(
      <MemoryRouter>
        <ServiceList categoryName="Restaurant" />
      </MemoryRouter>,
    );

    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.queryByText("Service 2")).not.toBeInTheDocument();
  });

  test("renders an empty list if no services are available", () => {
    (useServices as jest.Mock).mockReturnValue({ data: [] });

    render(
      <MemoryRouter>
        <ServiceList />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Service 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Service 2")).not.toBeInTheDocument();
  });
});
