import { ICategory } from "../../commons/ICategory";
import { IWrapper } from "../../commons/IWrapper";
import { Params } from "../../commons/Params";
import api from "../../configs/api";

export default function useCategory(){

    const DPath = 'categories'

    async function getCategories(params?: Params): Promise<IWrapper<ICategory>> {
        try {
          const result = await api.get<IWrapper<ICategory>>(`${DPath}`, {params});
          return result.data;
        } catch (error: any) {
          return error.response?.data?.message;
        }
      }

    return {
        getCategories
    }
}