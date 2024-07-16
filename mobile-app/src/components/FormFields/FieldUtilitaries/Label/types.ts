import { ReactNode } from "react";

interface ILabelProps {
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
}

export { ILabelProps };
