import { render, act } from "@testing-library/react";
import { UserProvider, UserContext } from "@/components/context/UserContext";
import { useLocalStorage } from "usehooks-ts";
import { LoginResponse, User } from "@/components/user/types";

jest.mock("usehooks-ts", () => ({
  useLocalStorage: jest.fn(),
}));

const mockUseLocalStorage = useLocalStorage as jest.Mock;

describe("UserContext", () => {
  let userState: User | null = null;
  let tokenState: string | null = null;

  const setUserMock = jest.fn((newUser: User | null) => {
    userState = newUser;
  });
  const setTokenMock = jest.fn((newToken: string | null) => {
    tokenState = newToken;
  });

  beforeEach(() => {
    userState = null;
    tokenState = null;

    mockUseLocalStorage.mockImplementation((key, initialValue) => {
      if (key === "user") {
        return [userState, setUserMock];
      }
      if (key === "token") {
        return [tokenState, setTokenMock];
      }
      return [initialValue, jest.fn()];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("provides initial context values", () => {
    let contextValues: any;

    render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>,
    );

    expect(contextValues.user).toBeNull();
    expect(contextValues.isLoggedIn).toBe(false);
    expect(typeof contextValues.login).toBe("function");
    expect(typeof contextValues.logout).toBe("function");
  });

  it("updates user and token on login", () => {
    const loginResponse: LoginResponse = {
      status: "success",
      token: "test-token",
      user: { _id: "123", name: "Test User", email: "test@example.com" },
    };

    let contextValues: any;

    const { rerender } = render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>,
    );

    act(() => {
      contextValues.login(loginResponse);
    });

    rerender(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>,
    );

    expect(contextValues.user).toEqual(loginResponse.user);
    expect(contextValues.isLoggedIn).toBe(true);

    expect(setUserMock).toHaveBeenCalledWith(loginResponse.user);
    expect(setTokenMock).toHaveBeenCalledWith(loginResponse.token);
  });

  it("clears user and token on logout", () => {
    const loginResponse: LoginResponse = {
      status: "success",
      token: "test-token",
      user: { _id: "123", name: "Test User", email: "test@example.com" },
    };

    let contextValues: any;

    const { rerender } = render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>,
    );

    act(() => {
      contextValues.login(loginResponse);
    });

    rerender(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>,
    );

    act(() => {
      contextValues.logout();
    });

    rerender(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>,
    );

    expect(contextValues.user).toBeNull();
    expect(contextValues.isLoggedIn).toBe(false);

    expect(setUserMock).toHaveBeenCalledWith(null);
    expect(setTokenMock).toHaveBeenCalledWith(null);
  });
});
