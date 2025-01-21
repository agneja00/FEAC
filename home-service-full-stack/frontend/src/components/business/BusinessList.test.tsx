import { render, screen } from "@testing-library/react";
import BusinessList from "./BusinessList";
import { Business } from "./types";
import { useBusinesses } from "./hooks";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter

jest.mock("./hooks");

const mockBusinesses: Business[] = [
  {
    _id: "1",
    imageUrls: ["https://example.com/image1.jpg"],
    name: "Business 1",
    category: "Restaurant",
    contactPerson: "John Doe",
    address: "123 Street A",
    email: "business@gmail.com",
    about: "good restaurant",
    favorite: false,
  },
  {
    _id: "2",
    imageUrls: ["https://example.com/image2.jpg"],
    name: "Business 2",
    category: "Retail",
    contactPerson: "Jane Smith",
    address: "456 Street B",
    email: "business1@gmail.com",
    about: "good retail business",
    favorite: false,
  },
];

describe("BusinessList Component", () => {
  beforeEach(() => {
    (useBusinesses as jest.Mock).mockReturnValue({ data: mockBusinesses });
  });

  test("renders a list of businesses", () => {
    render(
      <MemoryRouter>
        <BusinessList />
      </MemoryRouter>
    );

    expect(screen.getByText("Business 1")).toBeInTheDocument();
    expect(screen.getByText("Business 2")).toBeInTheDocument();
  });

  test("filters businesses by category", () => {
    render(
      <MemoryRouter>
        <BusinessList categoryName="Restaurant" />
      </MemoryRouter>
    );

    expect(screen.getByText("Business 1")).toBeInTheDocument();
    expect(screen.queryByText("Business 2")).not.toBeInTheDocument();
  });

  test("renders an empty list if no businesses are available", () => {
    (useBusinesses as jest.Mock).mockReturnValue({ data: [] });

    render(
      <MemoryRouter>
        <BusinessList />
      </MemoryRouter>
    );

    expect(screen.queryByText("Business 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Business 2")).not.toBeInTheDocument();
  });
});
