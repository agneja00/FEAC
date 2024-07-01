import PropTypes from "prop-types";
import { createContext } from "react";
import { useLocalStorage } from "usehooks-ts";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = (user) => setUser(user);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };
