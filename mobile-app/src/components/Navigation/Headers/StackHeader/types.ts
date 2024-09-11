import { GestureResponderEvent } from "react-native";
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

interface IStackHeaderProps extends NativeStackHeaderProps {
  options: NativeStackNavigationOptions & { handleMorePress?(event: GestureResponderEvent): void };
}

export { IStackHeaderProps };
