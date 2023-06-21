import React, { useContext } from "react";
import { createPortal } from "react-dom";
import ConfirmDialog from "./ConfirmDialog";
import { ConfirmContext } from "../../contexts/ConfirmContext";
import { IConfirmKind } from "../../contexts/ConfirmContext/types";

const GlobalConfirm = () => {

  const [confirmState, confirmDispach] = useContext(ConfirmContext)

  const closeConfirm = () => {
    confirmDispach({type: IConfirmKind.HIDE_CONFIRM,payload: undefined})
  }
  const portalElement = document.getElementById("confirm");
  const component = confirmState?.show ? (
    <ConfirmDialog
      onClose={closeConfirm}
      open={confirmState.show}
      text={confirmState.text}
      onCancel={confirmState.onCancel}
      onConfirm={confirmState.confirmAction}
      fullWidth
      maxWidth={"sm"}
      actions
    ></ConfirmDialog>
  ) : null;

  return createPortal(component, portalElement as HTMLElement);
};
export default GlobalConfirm;
