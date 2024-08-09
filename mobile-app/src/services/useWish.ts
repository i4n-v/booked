import { IWrapper } from "@/types/Wrapper";
import { Params } from "@/types/Params";
import api from "@/config/api";
import IBook from "@/types/Book";
import { ResponseMessage } from "@/types/ResponseMessage";

export default function useWishe() {
  const path = "wishe";

  async function getWishes(params?: Params): Promise<IWrapper<IBook>> {
    try {
      const response = await api.get<IWrapper<IBook>>(`${path}/books`, {
        params,
      });
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
