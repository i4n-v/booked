import useApi from "../../hooks/useApi";
import IUser from "../../commons/IUser";
import { ResponseMessage } from "../../commons/ResponseMessage";

export default function useUser() {
  const user = useApi("users");
  async function getUser(id: string = "") {
    try {
      const result = await user.get(id);
      return result.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  async function createUser(data: IUser<"CREATE">) {
    try {
      const result = await user.post<ResponseMessage>(data);
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    getUser,
    createUser,
  };
}