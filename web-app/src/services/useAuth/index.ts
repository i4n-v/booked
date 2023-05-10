import IUser from "../../commons/IUser";
import useApi from "../../hooks/useApi";

export default function useAuth() {
  const user = useApi();

  async function login(data: IUser<"LOGIN">) {
    try {
      const result = await user.post<IUser<"AUTHDATA">>("login", data);
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function logout() {
    try {
      const result = await user.patch("logout");
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    login,
    logout,
  };
}
