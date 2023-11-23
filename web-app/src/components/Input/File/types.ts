import { ReactNode } from "react";

export interface InputFileProps {
  name: string;
  button?: boolean;
  accept?: "application/pdf" | ".png, .jpg, .jpeg";
  label?: string;
  hiddeFileName?: boolean;
  customIcon?: ReactNode;
}
