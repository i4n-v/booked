import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";
import { StyleProp, ViewStyle } from "react-native";

interface IIconProps<T extends ExpoVectorIcon> {
  name: keyof T["glyphMap"];
  icon: T;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export { IIconProps };
