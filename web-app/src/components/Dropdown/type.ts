import { MenuProps } from "@mui/material";
import { ReactNode } from "react";

export type DropdownOptions = {
  icon?: ReactNode;
  label: string;
  handler?: () => void;
};

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  options: DropdownOptions[];
};

export type DropdownProps = Props & MenuProps;