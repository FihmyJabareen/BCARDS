import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const CustomThemeContext = createContext({
  mode: "light",
  toggleColorMode: () => {},
});

export function useCustomTheme() {
  return useContext(CustomThemeContext);
}

export default function CustomThemeProvider({ children }) {
  const getInitial = () => {
    const saved = localStorage.getItem("colorMode");
    if (saved === "light" || saved === "dark") return saved;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "dark" : "light";
  };

  const [mode, setMode] = useState(getInitial);

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  const toggleColorMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        shape: { borderRadius: 10 },
        components: {
          MuiPaper: { styleOverrides: { root: { transition: "background-color .2s ease" } } },
        },
      }),
    [mode]
  );

  const value = useMemo(() => ({ mode, toggleColorMode }), [mode, toggleColorMode]);

  return (
    <CustomThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
}
