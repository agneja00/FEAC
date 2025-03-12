import { render, screen, fireEvent } from "@testing-library/react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../common/LanguageSwither";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("LanguageSwitcher", () => {
  const changeLanguageMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      i18n: {
        language: "en",
        changeLanguage: changeLanguageMock,
      },
    });

    (useParams as jest.Mock).mockReturnValue({
      lang: "en",
    });

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    Object.defineProperty(window, "location", {
      value: {
        pathname: "/en/some-path",
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the language buttons correctly", () => {
    render(<LanguageSwitcher />);

    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("LT")).toBeInTheDocument();
    expect(screen.getByText("RU")).toBeInTheDocument();
  });

  it("changes the language when a button is clicked", () => {
    render(<LanguageSwitcher />);

    fireEvent.click(screen.getByText("LT"));

    expect(changeLanguageMock).toHaveBeenCalledWith("lt");
    expect(navigateMock).toHaveBeenCalledWith("/lt/some-path");
  });

  it("updates the URL path when changing language", () => {
    render(<LanguageSwitcher />);

    fireEvent.click(screen.getByText("RU"));

    expect(navigateMock).toHaveBeenCalledWith("/ru/some-path");
  });
});
