import { render, screen, fireEvent } from "@testing-library/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BusinessPartnersPage from "./BusinessPartnersPage";

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("@/components/common/Button", () => ({
  __esModule: true,
  default: jest.fn((props) => <button {...props}>{props.children}</button>),
}));

jest.mock("@/components/common/Modal", () => ({
  __esModule: true,
  default: jest.fn((props) => (
    <div>
      {props.children}
      <button onClick={props.onClose}>Close</button>
    </div>
  )),
}));

jest.mock("@/components/service/ServiceRegisterForm", () => ({
  __esModule: true,
  default: jest.fn(() => <div>ServiceRegisterForm</div>),
}));

describe("BusinessPartnersPage", () => {
  const setSearchParams = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(""),
      setSearchParams,
    ]);
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useTranslation as jest.Mock).mockReturnValue({
      t: jest.fn((key) => {
        if (key === "buttons.registerNow") return "Register Now";
        return key;
      }),
    });
  });

  it("renders correctly", () => {
    render(<BusinessPartnersPage />);
    expect(screen.getByText("common.forBusinessPartners")).toBeInTheDocument();
    expect(screen.getByText("forBusinessPartners.join")).toBeInTheDocument();
  });

  it("opens modal when button is clicked", () => {
    render(<BusinessPartnersPage />);
    const registerButton = screen.getByRole("button", { name: "Register Now" });
    fireEvent.click(registerButton);
    expect(screen.getByText("ServiceRegisterForm")).toBeInTheDocument();
  });
});
