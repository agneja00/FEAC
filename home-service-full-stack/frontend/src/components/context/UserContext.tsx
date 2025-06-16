import { PropsWithChildren, createContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ILoginResponse, IUser } from "../user/types";

const UserContext = createContext<{
  user: IUser | null;
  isLoggedIn: boolean;
  login: (user: ILoginResponse) => void;
  logout: () => void;
  setUser: (user: IUser | null) => void;
}>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  setUser: () => {},
});

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage<IUser | null>("user", null);
  const [, setToken] = useLocalStorage<string | null>("token", null);

  const isLoggedIn = !!user;

  const login = (loginResponse: ILoginResponse) => {
    setUser(loginResponse.user);
    setToken(loginResponse.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
