import * as React from "react";
import { Alert, AlertProps, Snackbar, SnackbarCloseReason, Stack } from "@mui/material";
import { INotifierProps } from "./types";
import { NotifierContext } from "../../contexts/NotifierContext";
import { INotifierActionKind } from "../../contexts/NotifierContext/types";
import { createPortal } from "react-dom";

const ReferencedAlert = React.forwardRef((props: AlertProps, ref: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined) => (
  <Alert ref={ref} {...props} />
));

export function Notifier({
  show,
  close,
  severity,
  message,
  timeToClose = 2000,
}: INotifierProps) {
  const handleClose = (event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    close();
  };


  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={show}
        autoHideDuration={timeToClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <ReferencedAlert
          onClose={handleClose as (event: React.SyntheticEvent<Element, Event>) => void}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </ReferencedAlert>
      </Snackbar>
    </Stack>
  );
}



export const GlobalNotifier = () => {
  const [notifierState, dispatch] = React.useContext(NotifierContext)

  const closeNotify = () => {
    dispatch({
      type: INotifierActionKind.HIDE_NOTIFICATION,
    });
  };
  const portalElement: HTMLElement | null = document.getElementById('notify');
  const component = notifierState.show ? (
    <Notifier message={notifierState.message} show={notifierState.show} severity={notifierState.severity} close={closeNotify} />
  ) : null;

  return createPortal(component, portalElement as HTMLElement);
};
