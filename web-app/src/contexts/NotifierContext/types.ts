import { AlertColor } from "@mui/material";

export type INotifier = {
    show: boolean,
    message: string,
    severity?: AlertColor
};

export enum INotifierActionKind{
    SHOW_NOTIFICATION  = 'SHOW_NOTIFICATION' ,
    HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'
}

export type INotifierAction = {
    type: INotifierActionKind,
    payload?: INotifier
}