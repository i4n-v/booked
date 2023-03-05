import { AlertColor } from "@mui/material";
import { useContext } from "react";
import { NotifierContext } from "../../context/NotifierContext";
import { INotifierActionKind } from "../../context/NotifierContext/types";


function useNotifier() {
    const [, dispatch] = useContext(NotifierContext)
    let resolveCallback;
    const notify = (message: string, severity: AlertColor) => {
        dispatch({
            type: INotifierActionKind.SHOW_NOTIFICATION,
            payload: {
                show: true,
                message,
                severity
            },
        });
        return new Promise((res, rej) => {
            resolveCallback = res;
            return resolveCallback
        });
    };
    return notify
}


export default useNotifier;