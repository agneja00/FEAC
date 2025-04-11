import { useTheme } from "../context/ThemeContext";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

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
        {theme === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};

export default FloatingThemeToggle;
