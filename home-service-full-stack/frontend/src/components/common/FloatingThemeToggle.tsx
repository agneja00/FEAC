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
        color="inherit"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 20,
          zIndex: 9999,
          bgcolor: "#8056eb",
          color: "common.white",
          "&:hover": {
            bgcolor: "#6a4bc7",
          },
        }}
      >
        {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default FloatingThemeToggle;
