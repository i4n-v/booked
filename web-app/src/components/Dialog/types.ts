import { BoxProps, DialogProps } from "@mui/material";

export interface iBookedDialog extends DialogProps {
  onClose:
    | ((
        event?: any,
        reason?: "backdropClick" | "escapeKeyDown" | "closeButton"
      ) => void)
    | (() => void);
  height?: string | number;
  width?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
}
