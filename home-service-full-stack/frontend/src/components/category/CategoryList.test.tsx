import { render, screen, waitFor } from "@testing-library/react";
import CategoryList from "../category/CategoryList";
import { useCategories } from "./hooks";
import { MemoryRouter } from "react-router-dom";

jest.mock("./hooks", () => ({
  useCategories: jest.fn(),
}));

describe("CategoryList Component", () => {
  const mockCategories = [
    { _id: "1", name: "Cleaning", url: "/icons/cleaning.png" },
    { _id: "2", name: "Plumbing", url: "/icons/plumbing.png" },
    { _id: "3", name: "Electrical", url: "/icons/electrical.png" },
  ];

  beforeEach(() => {
    (useCategories as jest.Mock).mockReturnValue({ data: mockCategories });
  });

  test("renders category cards based on categories data", () => {
    render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    );

    mockCategories.forEach((category) => {
      const categoryCard = screen.getByText(category.name);
      expect(categoryCard).toBeInTheDocument();
    });
  });

  test("does not render any cards when categories data is empty", () => {
    (useCategories as jest.Mock).mockReturnValue({ data: [] });

    render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    );

    const cards = screen.queryAllByRole("button");
    expect(cards).toHaveLength(0);
  });
});
