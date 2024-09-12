import { IWrapper } from "@/types/Wrapper";
import { Params } from "@/types/Params";
import api from "@/config/api";
import { IAcquisitions } from "@/types/Acquisitions";
import { ResponseMessage } from "@/types/ResponseMessage";
const DPath = "acquisitions";

export default function useAcquisitions() {
  async function getAcquisitions(params?: Params): Promise<IWrapper<IAcquisitions>> {
    try {
      const response = await api.get<IWrapper<IAcquisitions>>(`${DPath}/books`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function createAcquisition(id: string): Promise<ResponseMessage> {
    try {
      const response = await api.post(`${DPath}/books/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function updateAcquisition({
    id,
    data,
  }: {
    id: string;
    data: { marked_page: number | null };
  }): Promise<ResponseMessage> {
    try {
      const response = await api.put(`${DPath}/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    getAcquisitions,
    createAcquisition,
    updateAcquisition,
  };
}
