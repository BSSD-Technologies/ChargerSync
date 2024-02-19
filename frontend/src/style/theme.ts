import { PaletteMode, ThemeOptions } from "@mui/material";

export const getTheme = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode
  },
  typography: {
    fontFamily: 'inherit',
    h1: {
      font: "Inter",
      fontSize: "6rem",
    },
    h2: {
      font: "Inter",
      fontSize: "3.75rem",
    },
    h3: {
      font: "Inter",
      fontSize: "3rem",
    },
    h4: {
      font: "Inter",
      fontSize: "2.125rem",
      fontWeight: 600,
      letterSpacing: "0.25px",
    },
    h5: {
      font: "Inter",
      fontSize: "1.5rem",
    },
    h6: {
      font: "Inter",
      fontSize: "1.25rem",
    },
    body1: {
      font: "Inter",
      fontSize: "1rem",
    },
  },
  components: {},
});
