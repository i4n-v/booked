import { Control } from "react-hook-form";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

interface ISwitchProps {
  name: string;
  value?: boolean;
  label?: string;
  control: Control<any, any>;
  required?: boolean;
  disabled?: boolean;
  containerProps?: ViewProps;
  onChange?(value: boolean): void;
  customOnChange?(value: boolean): void;
}

export { ISwitchProps };
