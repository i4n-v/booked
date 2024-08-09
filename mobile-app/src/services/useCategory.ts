import { ICategory } from "@/types/Category";
import { IWrapper } from "@/types/Wrapper";
import { Params } from "@/types/Params";
import api from "@/config/api";

export default function useCategory() {
  const DPath = "categories";

  async function getCategories(params?: Params): Promise<IWrapper<ICategory>> {
    try {
      const result = await api.get<IWrapper<ICategory>>(`${DPath}`, { params });
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    getCategories,
  };
}
