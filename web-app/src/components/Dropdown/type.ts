import { ReactNode } from "react";

export type DropdownOptions = {
  icon?: ReactNode;
  label: string;
  handler?: () => void;
};

export type DropdownProps = {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  options: DropdownOptions[];
};
