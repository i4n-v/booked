import { IWrapper } from "../../commons/IWrapper";
import { Params } from "../../commons/Params";
import api from "../../configs/api";
import { IAcquisitions } from "../../commons/IAcquisitions";
import { ResponseMessage } from "../../commons/ResponseMessage";
export default function useAcquisitions() {
  const DPath = "acquisitions/books";

  async function getAcquisitions(
    params?: Params
  ): Promise<IWrapper<IAcquisitions>> {
    try {
      const response = await api.get<IWrapper<IAcquisitions>>(`${DPath}`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  async function createAcquisition(id: string): Promise<ResponseMessage> {
    try {
      const response = await api.post(`${DPath}/${id}`);
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  return {
    getAcquisitions,
    createAcquisition,
  };
}
