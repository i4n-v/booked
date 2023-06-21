import { ContextAction } from "../../commons/ContextAction";

export type IConfirm = {
    show?: boolean;
    text?: string;
    confirmAction?: () => void;
    onCancel?: () => void;
    onConfirm?: () => void;
}

export enum IConfirmKind {
    SHOW_CONFIRM,
    HIDE_CONFIRM
}

export type IConfirmAction = ContextAction<IConfirmKind, IConfirm>;
