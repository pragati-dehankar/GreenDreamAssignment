"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const theme = createTheme();

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
