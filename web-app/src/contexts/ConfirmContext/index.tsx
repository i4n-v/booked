import React, { Dispatch, useReducer } from "react";
import { IConfirm, IConfirmAction, IConfirmKind } from "./types";


export const initialState : IConfirm | undefined = {
  show: false,
  text: "",
  confirmAction: () => null,
};
export const ConfirmContext = React.createContext<[IConfirm | undefined,Dispatch<IConfirmAction>]>([initialState, (value: IConfirmAction) => null]);

const reducer = (state = initialState, {type,payload}: IConfirmAction) => {
  switch (type) {
    case IConfirmKind.SHOW_CONFIRM:
      return {
        show: true,
        confirmAction: payload?.confirmAction,
        text: payload?.text
      } as IConfirm;
    case IConfirmKind.HIDE_CONFIRM:
      return initialState;
    default:
      return initialState;
  }
};

export const ConfirmContextProvider = ({ children }:{ children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ConfirmContext.Provider value={[state, dispatch]}>
      {children}
    </ConfirmContext.Provider>
  );
};
