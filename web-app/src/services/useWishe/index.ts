import { IWrapper } from "../../commons/IWrapper";
import { Params } from "../../commons/Params";
import api from "../../configs/api";
import { IWishes } from "../../commons/IWishes";
import { ResponseMessage } from "../../commons/ResponseMessage";

export default function useWishes() {
  const path = "wishe";

  async function getWishes(
    params?: Params
  ): Promise<IWrapper<IWishes[] | null>> {
    try {
      const response = await api.get<IWrapper<IWishes[] | null>>(
        `${path}/books`,
        {
          params,
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function createWishe(bookId: string): Promise<ResponseMessage> {
    try {
      const response = await api.post(`${path}/books/${bookId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function deleteWishe(bookId: string): Promise<ResponseMessage> {
    try {
      const response = await api.delete(`${path}/books/${bookId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    getWishes,
    createWishe,
    deleteWishe,
  };
}
