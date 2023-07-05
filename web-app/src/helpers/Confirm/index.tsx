import { useContext } from "react";
import { ConfirmContext } from "../../contexts/ConfirmContext";
import { IConfirmKind } from "../../contexts/ConfirmContext/types";
let resolveCallback: (res: boolean) => void;
export function useConfirm(handleCancel = () => null) {
  const [, dispatch] = useContext(ConfirmContext);
  const onConfirm = (confirmAction: () => void) => {
    closeConfirm();
    resolveCallback(true);
    confirmAction();
  };

  const onCancel = () => {
    handleCancel();
    closeConfirm();
    resolveCallback(false);
  };

  const confirm = (text: string, confirmAction: () => void) => {
    dispatch({
      type: IConfirmKind.SHOW_CONFIRM,
      payload: {
        text,
        confirmAction,
        onCancel,
        onConfirm: () => onConfirm(confirmAction),
      },
    });
    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  const closeConfirm = () => {
    dispatch({
      type: IConfirmKind.HIDE_CONFIRM,
    });
  };

  return confirm;
}
