import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

interface IIconButtonProps<T extends ExpoVectorIcon> {
  name: keyof T["glyphMap"];
  icon: T;
  color?: string;
  size?: number;
  activeOpacity?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?(event: GestureResponderEvent): void;
}

export { IIconButtonProps };
