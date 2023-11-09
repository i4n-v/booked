import { IWrapper } from "../../commons/IWrapper";
import { Params } from "../../commons/Params";
import api from "../../configs/api";
import { IWishes } from "../../commons/IWishes";
import { ResponseMessage } from "../../commons/ResponseMessage";
export default function useWishes() {
  const DPath = "wishe";

  async function getWishes(
    params?: Params
  ): Promise<IWrapper<IWishes[] | null>> {
    try {
      const response = await api.get<IWrapper<IWishes[] | null>>(
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

  async function createWish(bookId: string): Promise<ResponseMessage> {
    try {
      const response = await api.post(`${DPath}/books/${bookId}`);
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  async function deleteWish(id: string): Promise<ResponseMessage> {
    try {
      const response = await api.delete(`${DPath}/${id}`);
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  return {
    getWishes,
    createWish,
    deleteWish,
  };
}
