import { IWrapper } from "../../commons/IWrapper";
import { Params } from "../../commons/Params";
import { ResponseMessage } from "../../commons/ResponseMessage";
import api from "../../configs/api";
import { IMessage } from "../useMessage/types";
import { GroupChatCreate, GroupChatUpdate, IChat } from "./types";

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

  async function getMessages(
    chatid: string,
    params: Params
  ): Promise<IWrapper<IMessage>> {
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
  async function updateGroup({
    id,
    ...data
  }: GroupChatUpdate): Promise<ResponseMessage> {
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
