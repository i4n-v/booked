import api from "@/config/api";
import { IMessage } from "@/types/Message";
const DPath = "/messages";

export default function useMessage() {
  async function createMessage(message: IMessage<"SEND">) {
    try {
      const formData = new FormData();
      Object.entries(message).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((obj, index) => {
              formData.append(`${key}[]`, obj);
            });
            return;
          }
          formData.append(key, value);
        }
      });

      const response = await api.post(DPath, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function deleteMessage(id: string) {
    try {
      const response = await api.delete(`${DPath}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    createMessage,
    deleteMessage,
  };
}
