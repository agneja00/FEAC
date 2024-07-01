import styles from "../Login/Login.module.scss";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const createUser = () => {
    const user = {
      name,
      email,
      password,
    };
    console.log(user);
  };

  const validateForm = () => {
    if (!name) {
      setErrorName("You need to fill input!");
    } else {
      setErrorName("");
    }

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
    if (!errorName && !errorEmail && !errorPassword) {
      createUser();
      navigate(`${ROUTES.LOGIN}?success=true`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Name"
          type="text"
          onChange={handleChangeName}
          value={name}
          error={errorName}
          required
        />
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
          Register
        </Button>
        <Link to={ROUTES.LOGIN}>Already have an account? Log in</Link>
      </form>
    </div>
  );
};

export default Register;
