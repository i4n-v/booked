import { AlertColor } from "@mui/material";
import { useContext } from "react";
import { NotifierContext } from "../../contexts/NotifierContext";
import { INotifierActionKind } from "../../contexts/NotifierContext/types";


function useNotifier() {
    const [, dispatch] = useContext(NotifierContext)
    let resolveCallback;
    const notify = (message: string, severity: AlertColor = 'success') => {
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