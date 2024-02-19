"use client";

import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { ReactNode, useMemo } from "react";
import CssBaseline from '@mui/material/CssBaseline';

import { getTheme } from "@/style/theme";

export default function Providers({ children }: { children: ReactNode }) {

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () => createTheme(getTheme(prefersDarkMode ? "dark" : "light")),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
