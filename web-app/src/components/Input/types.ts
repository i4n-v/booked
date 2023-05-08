import { TextFieldProps } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";

type Props = {
  name: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  icon?: Partial<{
    left: React.ReactNode;
    right: React.ReactNode;
  }>;
  shrink?: boolean;
};

export type InputProps = TextFieldProps & Props;
