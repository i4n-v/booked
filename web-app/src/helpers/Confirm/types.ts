import { DialogProps } from "@mui/material";
import { IConfirm } from "../../contexts/ConfirmContext/types";
import React from "react";

export type IConfirmProps =Omit<DialogProps,"onClose"> & IConfirm & {
    onClose: () => void;
    icon?: React.ReactNode;
    actions?: boolean
}