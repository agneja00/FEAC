import { render, screen, fireEvent } from "@testing-library/react";
import FilteredList from "./FilteredList";
import { ReactNode } from "react";

jest.mock("@/components/common/Button", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

interface Item {
  id: number;
  name: string;
}

const renderItem = (item: Item): ReactNode => (
  <div key={item.id}>{item.name}</div>
);

const onFilterChange = jest.fn();

describe("FilteredList", () => {
  it("renders the list of items", () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    const filters = ["Filter 1", "Filter 2"];
    const activeFilter = "Filter 1";

    render(
      <FilteredList
        title="Test List"
        items={items}
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        renderItem={renderItem}
      />,
    );

    expect(screen.getByText("Test List")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("calls onFilterChange when a filter button is clicked", () => {
    const filters = ["Filter 1", "Filter 2"];
    const activeFilter = "Filter 1";

    render(
      <FilteredList
        title="Test List"
        items={[]}
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        renderItem={renderItem}
      />,
    );

    fireEvent.click(screen.getByText("Filter 2"));
    expect(onFilterChange).toHaveBeenCalledWith("Filter 2");
  });

  it("displays 'No items to display' when items array is empty", () => {
    const filters = ["Filter 1", "Filter 2"];
    const activeFilter = "Filter 1";

    render(
      <FilteredList
        title="Test List"
        items={[]}
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        renderItem={renderItem}
      />,
    );
    expect(screen.getByText("No items to display.")).toBeInTheDocument();
  });

  it("uses filterLabels when provided", () => {
    const filters = ["Filter 1", "Filter 2"];
    const activeFilter = "Filter 1";
    const filterLabels = {
      "Filter 1": "Custom Filter 1",
      "Filter 2": "Custom Filter 2",
    };

    render(
      <FilteredList
        title="Test List"
        items={[]}
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        renderItem={renderItem}
        filterLabels={filterLabels}
      />,
    );

    expect(screen.getByText("Custom Filter 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Filter 2")).toBeInTheDocument();
  });
});
