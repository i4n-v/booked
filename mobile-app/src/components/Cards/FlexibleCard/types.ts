import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

interface ICardIcon<I extends ExpoVectorIcon> {
  name: keyof I["glyphMap"];
  as: I;
}

interface ICardDescription<T> {
  label: string;
  key: keyof T & string;
  formatter?(value: T[keyof T], item: T): string;
  shouldRender?: boolean;
}

interface ICardActions<T, AI extends ExpoVectorIcon> {
  icon: AI;
  iconName: keyof AI["glyphMap"] & string;
  handler?(data: T): void;
  disabled?(data: T): boolean;
  visible?(data: T): boolean;
}

interface IFlexibleCardProps<T, I extends ExpoVectorIcon, AI extends ExpoVectorIcon = I> {
  data: T;
  title?: string;
  descriptions?: ICardDescription<T>[];
  actions?: ICardActions<T, AI>[];
  icon?: ICardIcon<I>;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?(event: GestureResponderEvent): void;
}

export { IFlexibleCardProps };
