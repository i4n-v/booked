import { ISolicitation, ISolicitationStatus } from "@/types/Solicitation";
import { IWrapper } from "@/types/Wrapper";
import { Params } from "@/types/Params";
import api from "@/config/api";

export function useSolicitation() {
  const DPath = "solicitations";
  async function getSolicitations(params: Params): Promise<IWrapper<ISolicitation>> {
    try {
      const response = await api.get(DPath, { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }
  async function cancelSolicitation({ id, status }: { id: string; status: ISolicitationStatus }) {
    try {
      const response = await api.put(`${DPath}/${id}`, { status });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }
  return { getSolicitations, cancelSolicitation };
}
