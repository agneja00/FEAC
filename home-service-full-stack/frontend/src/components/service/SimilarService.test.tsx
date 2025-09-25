import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SimilarService from "./SimilarService";
import { useServices, useCurrentService } from "./hooks";

jest.mock("./hooks");
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

  const mockServices = [
    {
      _id: "123",
      name: "Test Service",
      category: "Cleaning",
      imageUrls: ["https://example.com/image1.jpg"],
      contactPerson: "John Doe",
      address: "123 Test St",
    },
    {
      _id: "456",
      name: "Similar Service 1",
      category: "Cleaning",
      imageUrls: ["https://example.com/image2.jpg"],
      contactPerson: "Jane Doe",
      address: "456 Similar St",
    },
    {
      _id: "789",
      name: "Similar Service 2",
      category: "Plumbing",
      imageUrls: ["https://example.com/image3.jpg"],
      contactPerson: "John Smith",
      address: "789 Similar St",
    },
  ];

  beforeEach(() => {
    (useCurrentService as jest.Mock).mockReturnValue({
      currentService: mockCurrentService,
    });
    (useServices as jest.Mock).mockReturnValue({
      data: mockServices,
      isLoading: false,
      isError: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renders the similar services section correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/en/service/123"]}>
        <Routes>
          <Route path="/:lang/service/:id" element={<SimilarService />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("servicePage.similarServices"),
      ).toBeInTheDocument();

      expect(screen.getByText("Similar Service 1")).toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("456 Similar St")).toBeInTheDocument();

      expect(screen.queryByText("Test Service")).not.toBeInTheDocument();
    });
  });

  it("does not render services from different categories", async () => {
    render(
      <MemoryRouter initialEntries={["/en/service/123"]}>
        <Routes>
          <Route path="/:lang/service/:id" element={<SimilarService />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Similar Service 2")).not.toBeInTheDocument();
      expect(screen.queryByText("John Smith")).not.toBeInTheDocument();
      expect(screen.queryByText("789 Similar St")).not.toBeInTheDocument();
    });
  });

  it("renders correct links for similar services", async () => {
    render(
      <MemoryRouter initialEntries={["/en/service/123"]}>
        <Routes>
          <Route path="/:lang/service/:id" element={<SimilarService />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const link = screen.getByRole("link", { name: "Similar Service 1" });
      expect(link).toHaveAttribute("href", "/en/service/456");
    });
  });

  it("renders a message when there are no similar services", async () => {
    (useServices as jest.Mock).mockReturnValue({
      data: [mockCurrentService],
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={["/en/service/123"]}>
        <Routes>
          <Route path="/:lang/service/:id" element={<SimilarService />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Similar Service 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Similar Service 2")).not.toBeInTheDocument();
    });
  });
});
