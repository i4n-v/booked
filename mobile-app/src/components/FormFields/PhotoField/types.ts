import { DocumentPickerAsset } from "expo-document-picker";
import { Control } from "react-hook-form";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

interface IPhotoFieldProps {
  name: string;
  label?: string;
  control: Control<any, any>;
  disabled?: boolean;
  types?: string[] | string;
  containerProps?: ViewProps;
  customOnChange?(value: DocumentPickerAsset): void;
}

export { IPhotoFieldProps };
