import { Breakpoint, Color } from "@mui/material";

type SizeProps = Breakpoint | "xxl" | "xs" | "xs-b";
type sizes = {
  [prop in SizeProps]: string;
};

type ColorPartial = Partial<Color>;

declare module "@mui/material/styles" {
  interface PaletteColor extends ColorPartial {}
  interface Theme {
    font: sizes;
  }
  export interface ThemeOptions {
    font?: Partial<sizes>;
  }
}