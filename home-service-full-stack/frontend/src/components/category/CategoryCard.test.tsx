import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import CategoryCard from "../category/CategoryCard";
import { Category } from "../category/types";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("CategoryCard Component", () => {
  const mockCategory: Category = {
    name: "Cleaning",
    url: "/icons/cleaning.png",
    _id: "1",
  };

  const renderComponent = (category: Category, categoryParam?: string) => {
    return render(
      <MemoryRouter
        initialEntries={[`/en/services/categories/${categoryParam || ""}`]}
      >
        <Routes>
          <Route
            path="/:lang/services/categories/:category?"
            element={<CategoryCard category={category} />}
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  test("does not apply active class when category does not match URL", () => {
    (useParams as jest.Mock).mockReturnValue({
      lang: "en",
      category: "Plumbing",
    });

    const { container } = renderComponent(mockCategory, "Cleaning");
    const card = container.firstChild as HTMLElement;

    expect(card.classList.contains("active")).toBe(false);
  });
});
