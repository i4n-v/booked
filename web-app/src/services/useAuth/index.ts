import IUser from "../../commons/IUser";
import { ResponseMessage } from "../../commons/ResponseMessage";
import api from "../../configs/api";

export default function useAuth() {
  async function login(data: IUser<"LOGIN">) {
    try {
      const result = await api.post<IUser<"AUTHDATA">>("login", data);
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function verify() {
    try {
      const result = await api.get<ResponseMessage & { valid: boolean }>(
        "login/verify"
      );
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
