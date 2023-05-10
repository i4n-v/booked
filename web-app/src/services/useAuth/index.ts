import IUser from "../../commons/IUser";
import useApi from "../../hooks/useApi";

export default function useAuth() {
  const user = useApi("login");

  async function login(data: IUser<"LOGIN">) {
    try {
      const result = await user.post<IUser<"AUTHDATA">>(data);
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    login,
  };
}
