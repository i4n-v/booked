import { Control } from "react-hook-form";
import {
  ColorValue,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  TextInputProps,
  ViewProps,
} from "react-native";
import { IIconButtonProps } from "@/components/Buttons/IconButton/types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

type IInputIcon<T extends ExpoVectorIcon> = Omit<
  IIconButtonProps<T>,
  "style" | "activeOpacity" | "size"
>;

interface ITextFieldProps<L extends ExpoVectorIcon, R extends ExpoVectorIcon = L> {
  name?: string;
  value?: string | number | null;
  control?: Control<any, any>;
  label?: string;
  textArea?: boolean;
  numberOfLines?: number;
  mask?: RegExp[];
  password?: boolean;
  errorMessage?: string;
  showErrorMessage?: boolean;
  selectionColor?: ColorValue;
  leftIcon?: IInputIcon<L>;
  rightIcon?: IInputIcon<R>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  customOnChange?(value: string): void;
  containerProps?: ViewProps;
  inputProps?: TextInputProps;
  onChangeText?(value: string): void;
  onBlur?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onEndEditing?(e: NativeSyntheticEvent<TextInputEndEditingEventData>): void;
  onFocus?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
}

export { IInputIcon, ITextFieldProps };
