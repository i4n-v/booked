import { IWrapper } from "@/types/Wrapper";
import { Params } from "@/types/Params";
import { ResponseMessage } from "@/types/ResponseMessage";
import api from "@/config/api";
import { IMessage } from "@/types/Message";
import { GroupChatCreate, GroupChatUpdate, IChat } from "@/types/Chat";

export default function useChat() {
  const DPath = "/chats";
  async function getChats(params: Params): Promise<IWrapper<IChat>> {
    try {
      const response = await api.get(DPath, { params });
      return response.data;
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  async function getMessages(chatid: string, params: Params): Promise<IWrapper<IMessage>> {
    try {
      const response = await api.get(`${DPath}/${chatid}/messages`, { params });
      return response.data;
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  async function createGroup(data: GroupChatCreate): Promise<ResponseMessage> {
    try {
      const response = await api.post(`${DPath}`, data);
      return response.data;
    } catch (error: any) {
      return error.response.data.message;
    }
  }
  async function updateGroup({ id, ...data }: GroupChatUpdate): Promise<ResponseMessage> {
    try {
      const response = await api.put(`${DPath}/${id}`, data);
      return response.data;
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  return {
    getChats,
    getMessages,
    createGroup,
    updateGroup,
  };
}
