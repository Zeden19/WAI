import { createContext, useContext, useEffect, useState } from "react";

// Define the Theme type
const Theme = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
};

// Initial state for the theme context
const initialState = {
  theme: Theme.SYSTEM,
  setTheme: () => null,
};

// Create the context
const ThemeProviderContext = createContext(initialState);

// ThemeProvider component
export function ThemeProvider({
  children,
  defaultTheme = Theme.SYSTEM,
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove(Theme.LIGHT, Theme.DARK);

    if (theme === Theme.SYSTEM) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? Theme.DARK
        : Theme.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  const value = { theme, setTheme };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
