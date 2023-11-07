import api from "../../configs/api";
import { IMessage } from "./types";

export default function useMessage() {
  const DPath = "/messages";
  async function createMessage(message: IMessage<"SEND">) {
    try {
      const formData = new FormData();
      Object.entries(message).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await api.post(DPath, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  async function deleteMessage(id: string) {
    try {
      const response = await api.delete(`${DPath}/${id}`);
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  return {
    createMessage,
    deleteMessage,
  };
}
