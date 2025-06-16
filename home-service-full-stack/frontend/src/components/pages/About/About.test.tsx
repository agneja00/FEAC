import { render, screen, fireEvent } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import About from "./About";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  Link: ({
    to,
    children,
    className,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={to} className={className || ""}>
      {children}
    </a>
  ),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("@/components/common/Button", () => ({
  __esModule: true,
  default: jest.fn(({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  )),
}));

const mockUseParams = useParams as jest.Mock;
const mockUseTranslation = useTranslation as jest.Mock;

describe("About", () => {
  const t = jest.fn((key) => key);

  beforeEach(() => {
    mockUseParams.mockReturnValue({ lang: "en" });
    mockUseTranslation.mockReturnValue({ t });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the About component", () => {
    render(<About />);

    expect(screen.getByText("common.aboutUs")).toBeInTheDocument();
    expect(screen.getByText("aboutUs.paragraphFirst")).toBeInTheDocument();
    expect(screen.getByText("aboutUs.paragraphSecond")).toBeInTheDocument();
    expect(screen.getByText("aboutUs.paragraphThird")).toBeInTheDocument();
    expect(screen.getByText("aboutUs.paragraphFourth")).toBeInTheDocument();
  });

  it("toggles the expanded content when the button is clicked", () => {
    render(<About />);

    const readMoreButton = screen.getByText("buttons.readMore");
    expect(readMoreButton).toBeInTheDocument();

    fireEvent.click(readMoreButton);

    expect(screen.getByText("aboutUs.missionTitle")).toBeInTheDocument();
    expect(screen.getByText("aboutUs.forUsers")).toBeInTheDocument();
    expect(screen.getByText("aboutUs.forPartners")).toBeInTheDocument();
    expect(screen.getByText("aboutUs.requisites")).toBeInTheDocument();

    expect(screen.getByText("buttons.showLess")).toBeInTheDocument();

    fireEvent.click(screen.getByText("buttons.showLess"));

    expect(screen.queryByText("aboutUs.missionTitle")).not.toBeInTheDocument();
    expect(screen.queryByText("aboutUs.forUsers")).not.toBeInTheDocument();
    expect(screen.queryByText("aboutUs.forPartners")).not.toBeInTheDocument();
    expect(screen.queryByText("aboutUs.requisites")).not.toBeInTheDocument();

    expect(screen.getByText("buttons.readMore")).toBeInTheDocument();
  });

  it("renders the correct links", () => {
    render(<About />);

    fireEvent.click(screen.getByText("buttons.readMore"));

    const phoneLink = screen.getByText("+37062917326");
    expect(phoneLink).toHaveAttribute("href", "tel:+37062917326");

    const emailLink = screen.getByText("homeservices@gmail.com");
    expect(emailLink).toHaveAttribute("href", "mailto:homeservices@gmail.com");

    const formLink = screen.getByText("aboutUs.linkForm");
    expect(formLink).toHaveAttribute(
      "href",
      "/en/for-business-partners?openModal=true",
    );
  });

  it("renders the map iframe", () => {
    render(<About />);

    fireEvent.click(screen.getByText("buttons.readMore"));

    const mapIframe = screen.getByTestId("map-iframe");
    expect(mapIframe).toBeInTheDocument();
    expect(mapIframe).toHaveAttribute(
      "src",
      expect.stringContaining("https://www.google.com/maps/embed"),
    );
  });
});
