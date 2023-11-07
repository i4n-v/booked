import { ReactNode } from "react";

export interface InputFileProps {
  name: string;
  button?: boolean;
  accept?: "application/pdf" | "image/*";
  label?: string;
  hiddeFileName?: boolean;
  customIcon?: ReactNode;
}
