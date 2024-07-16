import { Control } from "react-hook-form";
import { ViewProps } from "react-native";

interface ICheckBoxFieldProps<T> {
  name: string;
  value?: any[];
  label?: string;
  control?: Control<any, any>;
  direction?: "column" | "row";
  options: T[];
  optionLabelKey: string;
  optionValueKey?: string;
  optionCompareKey?: string;
  optionKeyExtractor?: string;
  required?: boolean;
  disabled?: boolean;
  containerProps?: ViewProps;
  onChange?(value: any): void;
  customOnChange?(value: any): void;
}

export { ICheckBoxFieldProps };
