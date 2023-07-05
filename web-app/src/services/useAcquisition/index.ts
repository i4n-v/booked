import { IWrapper } from "../../commons/IWrapper";
import { Params } from "../../commons/Params";
import api from "../../configs/api";
import { IAcquisitions } from "../../commons/IAcquisitions";
import { ResponseMessage } from "../../commons/ResponseMessage";
export default function useAcquisitions() {
  const DPath = "acquisitions";

  async function getAcquisitions(
    params?: Params
  ): Promise<IWrapper<IAcquisitions>> {
    try {
      const response = await api.get<IWrapper<IAcquisitions>>(
        `${DPath}/books`,
        {
          params,
        }
      );
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  async function createAcquisition(id: string): Promise<ResponseMessage> {
    try {
      const response = await api.post(`${DPath}/books/${id}`);
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  async function updateAcquisition({
    id,
    data,
  }: {
    id: string;
    data: { marked_page: number };
  }): Promise<ResponseMessage> {
    try {
      const response = await api.put(`${DPath}/${id}`, data);
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  return {
    getAcquisitions,
    createAcquisition,
    updateAcquisition,
  };
}
