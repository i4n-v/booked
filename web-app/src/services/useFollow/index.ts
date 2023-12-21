import api from "../../configs/api";
import { ResponseMessage } from "../../commons/ResponseMessage";

export default function useFollow() {
  const path = "follower";

  async function followUser(id: string): Promise<ResponseMessage> {
    try {
      const response = await api.post(`${path}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }
  
  async function unfollowUser(id: string): Promise<ResponseMessage> {
    try {
      const response = await api.delete(`${path}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    followUser,
    unfollowUser,
  };
}
