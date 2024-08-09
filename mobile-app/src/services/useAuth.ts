import IUser from "@/types/User";
import { ResponseMessage } from "@/types/ResponseMessage";
import api from "@/config/api";

export default function useAuth() {
  async function login(data: IUser<"LOGIN">): Promise<IUser<"AUTHDATA">> {
    try {
      const result = await api.post<IUser<"AUTHDATA">>("login", data);
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function verify(): Promise<ResponseMessage & { valid: boolean }> {
    try {
      const result = await api.get<ResponseMessage & { valid: boolean }>("login/verify");
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function logout() {
    try {
      const result = await api.patch("logout");
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    login,
    logout,
    verify,
  };
}
