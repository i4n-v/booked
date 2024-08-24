import { Control } from "react-hook-form";
import { ViewProps } from "react-native";

interface IRatingFieldProps {
  name: string;
  control: Control<any, any>;
  size?: number;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  customOnChange?(value: number): void;
  containerProps?: ViewProps;
}

export { IRatingFieldProps };
