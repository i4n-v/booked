import { DialogProps } from "@mui/material";

export interface iBookedDialogContainer {
  width: string | number;
  height: string | number;
}

export interface iBookedDialog extends DialogProps, iBookedDialogContainer {
  onClose:
    | ((
        event?: any,
        reason?: "backdropClick" | "escapeKeyDown" | "closeButton"
      ) => void)
    | (() => void);
}
