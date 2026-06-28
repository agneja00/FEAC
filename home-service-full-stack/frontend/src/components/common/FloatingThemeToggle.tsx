import styles from "./FloatingThemeToggle.module.scss";
import { useTheme } from "../context/ThemeContext";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
      <IconButton
        className={styles.button}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default FloatingThemeToggle;