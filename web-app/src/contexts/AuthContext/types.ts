import { ContextAction } from "../../commons/ContextAction";
import IUser from "../../commons/IUser";

export enum AuthActionsKind {
  VERIFY = "VERIFY",
  SET_USER_DATA = "SET_USER_DATA",
}

export type AuthData = {
  userData?: Partial<IUser>;
};

export type AuthActions = ContextAction<AuthActionsKind, AuthData>;
