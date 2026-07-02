import styles from "./ThemeToggle.module.scss";
import { useTheme } from "../context/ThemeContext";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface ThemeToggleProps {
  variant?: "default" | "floating";
}

const ThemeToggle = ({ variant = "default" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  if (variant === "floating") {
    return (
      <Tooltip title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
        <IconButton
          className={styles.floatingButton}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Tooltip>
    );
  }

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
