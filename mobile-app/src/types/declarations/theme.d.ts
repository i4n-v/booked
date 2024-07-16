import "styled-components/native";
import { IThemePattern } from "@/types/Theme";

declare module "styled-components/native" {
  export interface DefaultTheme extends IThemePattern {}
}
