import { AlertProps, SnackbarCloseReason } from "@mui/material";
import { INotifier } from "../../contexts/NotifierContext/types";

export type INotifierProps = INotifier & {
    close: () => void,
    timeToClose?: number
}

export interface IReferencedAlertProps extends Omit<AlertProps, 'onClose'> {
    onClose: (event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void
}
