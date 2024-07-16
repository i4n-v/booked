import { darkColors, lightColors } from "./colors";
import shadows from "./shadows";
import shape from "./shape";
import { ITheme } from "@/types/Theme";
import typography from "./typography";

const theme: ITheme = {
  light: {
    mode: "light",
    colors: lightColors,
    typography,
    shape,
    shadows,
  },
  dark: {
    mode: "dark",
    colors: darkColors,
    typography,
    shape,
    shadows,
  },
};

export default theme;
