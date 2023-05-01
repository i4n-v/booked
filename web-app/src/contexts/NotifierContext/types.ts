import { AlertColor } from "@mui/material";
import { ContextAction } from "../../commons/ContextAction";

export type INotifier = {
  show: boolean;
  message: string;
  severity?: AlertColor;
};

export enum INotifierActionKind {
  SHOW_NOTIFICATION = "SHOW_NOTIFICATION",
  HIDE_NOTIFICATION = "HIDE_NOTIFICATION",
}

export type INotifierAction = ContextAction<INotifierActionKind, INotifier>;
