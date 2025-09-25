import { render, screen } from "@testing-library/react";
import VerticalCategoryList from "../category/VerticalCategoryList";
import { useCategories } from "./hooks";
import { useTranslation } from "react-i18next";
import { MemoryRouter } from "react-router-dom";

jest.mock("./hooks", () => ({
  useCategories: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("VerticalCategoryList Component", () => {
  const mockCategories = [
    { _id: "1", name: "Cleaning", url: "/icons/cleaning.png" },
    { _id: "2", name: "Plumbing", url: "/icons/plumbing.png" },
    { _id: "3", name: "Electrical", url: "/icons/electrical.png" },
  ];

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({ t: (key: string) => key });
    (useCategories as jest.Mock).mockReturnValue({ data: mockCategories });
  });

  test("renders the title correctly", () => {
    render(
      <MemoryRouter>
        <VerticalCategoryList />
      </MemoryRouter>,
    );

    const title = screen.getByText("categories.categories");
    expect(title).toBeInTheDocument();
  });
});
