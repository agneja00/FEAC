import styles from "./ThemeToggle.module.scss";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <span className={styles.slider} />
    </label>
  );
};

export default ThemeToggle;
