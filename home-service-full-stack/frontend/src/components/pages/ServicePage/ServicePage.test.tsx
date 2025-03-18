import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SimilarService from "../../service/SimilarService";
import { useServices, useCurrentService } from "../../service/hooks";

jest.mock("../../service/hooks");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("SimilarService", () => {
  const mockCurrentService = {
    _id: "123",
    name: "Test Service",
    category: "Cleaning",
  };

  const mockSimilarServices = [
    {
      _id: "456",
      name: "Similar Service 1",
      category: "Cleaning",
      imageUrls: ["https://example.com/image1.jpg"],
      contactPerson: "Jane Doe",
      address: "456 Similar St",
    },
    {
      _id: "789",
      name: "Similar Service 2",
      category: "Cleaning",
      imageUrls: ["https://example.com/image2.jpg"],
      contactPerson: "John Smith",
      address: "789 Similar St",
    },
  ];

  beforeEach(() => {
    (useCurrentService as jest.Mock).mockReturnValue({
      currentService: mockCurrentService,
    });
    (useServices as jest.Mock).mockReturnValue({
      data: mockSimilarServices,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the similar services section correctly", () => {
    render(
      <MemoryRouter initialEntries={["/en/service/123"]}>
        <Routes>
          <Route path="/:lang/service/:id" element={<SimilarService />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("servicePage.similarServices")).toBeInTheDocument();

    expect(screen.getByText("Similar Service 1")).toBeInTheDocument();
    expect(screen.getByText("Similar Service 2")).toBeInTheDocument();
  });

  it("does not render the current service in the similar services list", () => {
    render(
      <MemoryRouter initialEntries={["/en/service/123"]}>
        <Routes>
          <Route path="/:lang/service/:id" element={<SimilarService />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByText("Test Service")).not.toBeInTheDocument();
  });
});
