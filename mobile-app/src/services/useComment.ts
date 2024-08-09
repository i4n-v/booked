import { IWrapper } from "@/types/Wrapper";
import { Params } from "@/types/Params";
import { ResponseMessage } from "@/types/ResponseMessage";
import api from "@/config/api";
import { IComment } from "@/types/Comment";

export default function useComment() {
  const DPath = "comments";
  async function getComments(params: Params): Promise<IWrapper<IComment>> {
    try {
      const response = await api.get(DPath, { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function createComment(
    data: IComment<"CREATE"> | IComment<"RESPONSE">,
  ): Promise<ResponseMessage> {
    try {
      const response = await api.post(DPath, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function updateComment({
    description,
    comment_id,
  }: IComment<"UPDATE">): Promise<ResponseMessage> {
    try {
      const response = await api.put(`${DPath}/${comment_id}`, { description });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function deleteComment(comment_id: string): Promise<ResponseMessage> {
    try {
      const response = await api.delete(`${DPath}/${comment_id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    getComments,
    createComment,
    updateComment,
    deleteComment,
  };
}
