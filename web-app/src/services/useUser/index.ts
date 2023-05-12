import IUser from "../../commons/IUser";
import { ResponseMessage } from "../../commons/ResponseMessage";
import api from "../../configs/api";

export default function useUser() {
  async function getUser(id: string = "") {
    try {
      const result = await api.get<IUser>(`users/${id}`);
      return result.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  async function createUser(data: IUser<"CREATE">) {
    try {
      const result = await api.post<ResponseMessage>("users", data);
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function updateUser(data: IUser<"UPDATE">) {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo);
      Object.entries(data).forEach(([key, value]) => {
        if (["id", "photo"].includes(key)) return;
        formData.append(key, value);
      });
      const response = await api.patch(`users/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    getUser,
    createUser,
    updateUser,
  };
}
