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
          onClick={toggleTheme}
          aria-label="Toggle theme"
          sx={{
            display: "none",
            "@media (min-width: 920px)": {
              display: "inline-flex",
            },
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            width: "3.5rem",
            height: "3.5rem",
            zIndex: 5,
            background: "var(--gradient-brand)",
            color: "var(--white)",
            boxShadow: "0 0.5rem 1.25rem var(--shadow-hover)",
            transition: "all 0.25s ease",
            "&:hover": {
              background: "var(--gradient-brand-hover)",
              transform: "translateY(-0.2rem)",
            },
          }}
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