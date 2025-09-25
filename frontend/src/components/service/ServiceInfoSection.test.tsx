import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServiceInfoSection from "./ServiceInfoSection";
import { useCurrentService } from "./hooks";

jest.mock("./hooks");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ServiceInfoSection", () => {
  const mockCurrentService = {
    _id: "123",
    name: "Test Service",
    about: "This is a test service description.",
    imageUrls: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
  };

  beforeEach(() => {
    (useCurrentService as jest.Mock).mockReturnValue({
      currentService: mockCurrentService,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the service info section correctly", () => {
    render(
      <MemoryRouter>
        <ServiceInfoSection />
      </MemoryRouter>,
    );

    expect(screen.getByText("servicePage.description")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test service description."),
    ).toBeInTheDocument();
    expect(screen.getByText("servicePage.gallery")).toBeInTheDocument();
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });

  it("opens the modal when an image is clicked", () => {
    render(
      <MemoryRouter>
        <ServiceInfoSection />
      </MemoryRouter>,
    );

    const firstImage = screen.getAllByRole("img")[0];
    fireEvent.click(firstImage);

    expect(screen.getByAltText("Selected Image")).toBeInTheDocument();
  });

  it("displays a message when there are no images", () => {
    (useCurrentService as jest.Mock).mockReturnValue({
      currentService: { ...mockCurrentService, imageUrls: [] },
    });

    render(
      <MemoryRouter>
        <ServiceInfoSection />
      </MemoryRouter>,
    );

    expect(screen.getByText("messages.noImages")).toBeInTheDocument();
  });
});
