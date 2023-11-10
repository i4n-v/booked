import IBook from "./IBook";
import IUser from "./IUser";
export enum SolicitationStatus {
  pending = "Pendente",
  canceled = "Cancelado",
  accepted = "Aceito",
  refused = "Recusado",
}

export type ISolicitationStatus =
  | "pending"
  | "canceled"
  | "accepted"
  | "refused";
export type ISolicitation = {
  id?: string;
  status: ISolicitationStatus;
  user?: IUser;
  book?: IBook;
};
