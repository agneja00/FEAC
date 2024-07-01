import styles from "./Login.module.scss";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { ROUTES } from "@/constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useLocation } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSuccess = queryParams.get("success") === "true";

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    if (!email) {
      setErrorEmail("You need to fill input!");
    } else {
      setErrorEmail("");
    }

    if (!password) {
      setErrorPassword("You need to fill input!");
    } else {
      setErrorPassword("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!errorEmail && !errorPassword) {
      login({ email });
      navigate(ROUTES.HOME);
    }
  };

  return (
    <div className={styles.container}>
      {isSuccess && (
        <p className={styles.success}>
          Registration successful. You can now login.
        </p>
      )}
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          type="email"
          onChange={handleChangeEmail}
          value={email}
          error={errorEmail}
          required
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={handleChangePassword}
          value={password}
          error={errorPassword}
          required
        />
        <Button type="submit" onClick={validateForm}>
          Log In
        </Button>
        <Link to={ROUTES.REGISTER}>Don`t have an account? Sign up</Link>
      </form>
    </div>
  );
};

export default Login;
