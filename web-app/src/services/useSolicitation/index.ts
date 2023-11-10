import {
  ISolicitation,
  ISolicitationStatus,
} from "../../commons/ISolicitation";
import { IWrapper } from "../../commons/IWrapper";
import { Params } from "../../commons/Params";
import api from "../../configs/api";

export function useSolicitation() {
  const DPath = "solicitations";
  async function getSolicitations(
    params: Params
  ): Promise<IWrapper<ISolicitation>> {
    try {
      const response = await api.get(DPath, { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }
  async function cancelSolicitation({
    id,
    status,
  }: {
    id: string;
    status: ISolicitationStatus;
  }) {
    try {
      const response = await api.put(`${DPath}/${id}`, { status });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }
  return { getSolicitations, cancelSolicitation };
}
