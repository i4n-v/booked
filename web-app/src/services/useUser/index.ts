import IUser from "../../commons/IUser";
import { IWrapper } from "../../commons/IWrapper";
import { Params } from "../../commons/Params";
import { ResponseMessage } from "../../commons/ResponseMessage";
import api from "../../configs/api";
import { PasswordChange } from "../../pages/Profile/Settings/Security/types";

export default function useUser() {
  const DPath = "users";

  async function getUser(id: string): Promise<IUser> {
    try {
      const result = await api.get<IUser>(`${DPath}/${id}`);
      return result.data;
    } catch (error: any) {
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
      throw new Error(error.response?.data?.message);
    }
  }

  async function updateUser(data: IUser<"UPDATE">): Promise<ResponseMessage> {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo);
      Object.entries(data).forEach(([key, value]) => {
        if (["id", "photo"].includes(key)) return;
        formData.append(key, value);
      });
      const response = await api.patch(`${DPath}/${data.id}`, formData, {
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
      const response = await api.patch<ResponseMessage>(
        `/${DPath}/${id}/password`,
        data
      );
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
