import IUser from "@/types/User";
import { IWrapper } from "@/types/Wrapper";
import { Params } from "@/types/Params";
import { ResponseMessage } from "@/types/ResponseMessage";
import api from "@/config/api";
import { PasswordChange } from "@/types/PasswordChange";
import createFormData from "@/utils/createFormData";

export default function useUser() {
  const DPath = "users";

  async function getUser(id: string): Promise<IUser> {
    try {
      const result = await api.get<IUser>(`${DPath}/${id}`);
      return result.data;
    } catch (error: any) {
      console.log("Real", error);
      throw new Error(error.response?.data?.message);
    }
  }

  async function getUsers(params: Params): Promise<IWrapper<IUser>> {
    try {
      const result = await api.get<IWrapper<IUser>>(`${DPath}`, { params });
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function createUser(data: IUser<"CREATE">): Promise<ResponseMessage> {
    try {
      const result = await api.post<ResponseMessage>(DPath, data);
      return result.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response?.data?.message);
    }
  }

  async function updateUser({ id, ...data }: IUser<"UPDATE">): Promise<ResponseMessage> {
    try {
      console.log(data);
      const formData = createFormData(data);

      const response = await api.patch(`${DPath}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function passwordChange({
    data,
    id,
  }: {
    data: PasswordChange;
    id: string;
  }): Promise<ResponseMessage> {
    try {
      const response = await api.patch<ResponseMessage>(`/${DPath}/${id}/password`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    getUser,
    createUser,
    updateUser,
    passwordChange,
    getUsers,
  };
}
