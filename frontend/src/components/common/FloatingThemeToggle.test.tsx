import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FloatingThemeToggle from "./FloatingThemeToggle";
import { ThemeProvider } from "@/components/context/ThemeContext";

const getHtmlTheme = () => document.documentElement.getAttribute("data-theme");

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("FloatingThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.className = "";
  });

  test("renders the toggle button", () => {
    const { getByRole } = render(
      <ThemeProvider>
        <FloatingThemeToggle />
      </ThemeProvider>,
    );
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("toggles theme between light and dark", () => {
    const { getByRole } = render(
      <ThemeProvider>
        <FloatingThemeToggle />
      </ThemeProvider>,
    );

    const button = getByRole("button");

    expect(getHtmlTheme()).toBe("light");

    fireEvent.click(button);
    expect(getHtmlTheme()).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(button);
    expect(getHtmlTheme()).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
