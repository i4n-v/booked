import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";
import { IColors } from "@/types/Theme";
import { StyleProp, TextStyle, TouchableOpacityProps } from "react-native";
import { IIconProps } from "@/components/Icon/types";

type IButtonIcon<T extends ExpoVectorIcon> = IIconProps<T>;

interface IMainButtonProps<L extends ExpoVectorIcon, R extends ExpoVectorIcon = L>
  extends TouchableOpacityProps {
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  colorScheme?: keyof IColors;
  leftIcon?: IButtonIcon<L>;
  rightIcon?: IButtonIcon<R>;
  textStyle?: StyleProp<TextStyle>;
  variant?: "outlined" | "contained";
}

export { IMainButtonProps };
