import { ReactNode } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface ISimpleList {
  data?: string[];
  customIcon?: ReactNode;
  type?: "orded" | "unorded";
  emptyMessage?: string;
  itemStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export { ISimpleList };
