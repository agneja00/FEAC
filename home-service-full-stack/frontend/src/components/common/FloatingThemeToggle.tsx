import { useTheme } from "../context/ThemeContext";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
      <IconButton
        onClick={toggleTheme}
        aria-label="Toggle theme"
        sx={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 9999,
          width: 56,
          height: 56,
          background: "var(--gradient-brand)",
          color: "#ffffff",
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
};

export default FloatingThemeToggle;
