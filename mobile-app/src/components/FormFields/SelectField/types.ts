import { IFlatlisProps } from "@/components/BottomSheets/BottomSheetList/types";
import { Control } from "react-hook-form";
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

interface ISelectFieldProps<T> {
  name: string;
  label?: string;
  control: Control<any, any>;
  options: T[];
  optionKeyExtractor?: string;
  optionLabelKey: string;
  optionValueKey?: string;
  optionCompareKey?: string;
  emptyMessage?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  inputProps?: TextInputProps;
  containerProps?: ViewProps;
  listProps?: Omit<IFlatlisProps<T>, "data" | "renderItem">;
  loading?: boolean;
  onChange?(value: unknown): void;
  customOnChange?(value: unknown): void;
  onFocus?(event: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(): void;
}

export { ISelectFieldProps };
