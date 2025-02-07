import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import { Service } from "./types";
import { UserContext } from "../context/UserContext";
import { ROUTES } from "@/constants/routes";
import { FaRegHeart, FaHeart } from "react-icons/fa";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  generatePath: jest.fn((_path, params) => `/services/${params.id}`),
}));

jest.mock("./hooks", () => ({
  useToggleFavorite: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

const mockUser = {
  _id: "123",
  name: "Test User",
  email: "test@example.com",
};

const mockUserContextValue = {
  user: mockUser,
  isLoggedIn: true,
  login: jest.fn(),
  logout: jest.fn(),
};

const mockService: Service = {
  _id: "1",
  name: "Test Service",
  about: "About Test Service",
  address: "123 Test St",
  category: "Test Category",
  contactPerson: "Test Person",
  email: "test@example.com",
  imageUrls: ["image1.jpg"],
  favoritedBy: ["test@example.com"],
};

describe("ServiceCard", () => {
  const renderServiceCard = (
    props: Partial<React.ComponentProps<typeof ServiceCard>> = {},
  ) => {
    const defaultProps = {
      service: mockService,
      isFavorite: false,
    };

    return render(
      <MemoryRouter>
        <UserContext.Provider value={mockUserContextValue}>
          <ServiceCard {...defaultProps} {...props} />
        </UserContext.Provider>
      </MemoryRouter>,
    );
  };

  it("renders without crashing", () => {
    renderServiceCard();
    expect(screen.getByText(mockService.name)).toBeInTheDocument();
  });

  it("renders the service image if imageUrls are provided", () => {
    renderServiceCard();
    const image = screen.getByAltText(mockService.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockService.imageUrls[0]);
  });

  it("does not render the image if imageUrls are not provided", () => {
    renderServiceCard({ service: { ...mockService, imageUrls: [] } });
    expect(screen.queryByAltText(mockService.name)).not.toBeInTheDocument();
  });

  it("renders the service category", () => {
    renderServiceCard();
    expect(screen.getByText(mockService.category)).toBeInTheDocument();
  });

  it("renders the service name", () => {
    renderServiceCard();
    expect(screen.getByText(mockService.name)).toBeInTheDocument();
  });

  it("renders the contact person", () => {
    renderServiceCard();
    expect(screen.getByText(mockService.contactPerson)).toBeInTheDocument();
  });

  it("renders the address", () => {
    renderServiceCard();
    expect(screen.getByText(mockService.address)).toBeInTheDocument();
  });

  it('renders the "Book now" button', () => {
    renderServiceCard();
    expect(screen.getByText("Book now")).toBeInTheDocument();
  });

  it('navigates to the service details page when "Book now" is clicked', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    renderServiceCard();
    fireEvent.click(screen.getByText("Book now"));

    expect(mockNavigate).toHaveBeenCalledWith(`/services/${mockService._id}`);
  });

  it("renders the favorite button", () => {
    renderServiceCard();
    expect(
      screen.getByRole("button", { name: /Add to favorites/i }),
    ).toBeInTheDocument();
  });

  it("calls the toggleFavorite mutation when the favorite button is clicked", () => {
    const mutate = jest.fn();

    jest.spyOn(require("./hooks"), "useToggleFavorite").mockReturnValue({
      mutate,
      isPending: false,
    });

    renderServiceCard();
    fireEvent.click(screen.getByRole("button", { name: /Add to favorites/i }));

    expect(mutate).toHaveBeenCalledWith(
      { email: mockUser.email, serviceId: mockService._id },
      expect.anything(),
    );
  });

  it("disables the favorite button when isPending is true", () => {
    jest.spyOn(require("./hooks"), "useToggleFavorite").mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
    });

    renderServiceCard();
    const favoriteButton = screen.getByRole("button", {
      name: /Add to favorites/i,
    });
    expect(favoriteButton).toBeDisabled();
  });

  it("does not render if the service or service._id is missing", () => {
    const { container } = renderServiceCard({ service: null as any });
    expect(container).toBeEmptyDOMElement();
  });
});
