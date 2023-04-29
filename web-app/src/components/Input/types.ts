import { HTMLInputTypeAttribute } from "react";

export type InputProps = {
  name: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  icon?: Partial<{
    left: React.ReactNode;
    right: React.ReactNode;
  }>;
};
