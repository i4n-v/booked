import {
  ISolicitation,
  ISolicitationStatus,
} from "../../../../commons/ISolicitation";

export type SolicitationCardProps = {
  updateStatus: (id: string, status: ISolicitationStatus) => void;
} & ISolicitation;
