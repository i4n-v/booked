import IBook from "./Book";
import IUser from "./User";
export enum SolicitationStatus {
  pending = "Pendente",
  canceled = "Cancelada",
  accepted = "Aceita",
  refused = "Recusada",
}
export enum ISolicitationsType {
  received = "recebidas",
  sended = "enviadas",
}

export type ISolicitationStatus = "pending" | "canceled" | "accepted" | "refused";

export type ISolicitation = {
  id?: string;
  status: ISolicitationStatus;
  user?: IUser;
  book?: IBook;
};

export interface ISolicitationsFilters {
  min_date?: Date | null;
  max_date?: Date | null;
  status?: string[];
  type: keyof typeof ISolicitationsType;
  page: number;
}
