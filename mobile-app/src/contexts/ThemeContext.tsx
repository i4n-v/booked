import { ReactNode, createContext, useCallback, useState } from "react";
import theme from "@/global/theme";
import { IMode } from "@/types/Theme";
import { ThemeProvider } from "styled-components/native";

interface IThemeContextProps {
  mode: IMode;
  togleTheme(): void;
}

interface IThemeContextProviderProps {
  children: ReactNode;
}

const initialValues: IThemeContextProps = {
  mode: "light",
  togleTheme: () => {},
};

export const ThemeContext = createContext(initialValues);

export function ThemeContextProvider({ children }: IThemeContextProviderProps) {
  const [mode, setMode] = useState<IMode>("light");

  const togleTheme = useCallback(() => {
    setMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, togleTheme }}>
      <ThemeProvider theme={theme[mode]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
