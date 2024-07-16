import { ViewProps } from "react-native/Libraries/Components/View/ViewPropTypes";
import { TextInputProps } from "react-native";
import { Control } from "react-hook-form";

interface IDateFieldProps {
  name: string;
  control: Control<any, any>;
  label?: string;
  placeholder?: string;
  mode?: "date" | "time";
  dateFormat?: string;
  maximumDate?: Date;
  minimumDate?: Date;
  required?: boolean;
  disabled?: boolean;
  customOnChange?(value?: Date): void;
  inputProps?: TextInputProps;
  containerProps?: ViewProps;
}

interface IDateIcons {
  date: "date-range";
  time: "access-time";
}

export { IDateFieldProps, IDateIcons };
