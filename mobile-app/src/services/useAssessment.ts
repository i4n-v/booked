import IAssessment from "@/types/Assessment";
import { ResponseMessage } from "@/types/ResponseMessage";
import api from "@/config/api";

export default function useAssessment() {
  const DPath = "assessments";

  async function postAssessment(data?: IAssessment<"CREATE">): Promise<ResponseMessage> {
    try {
      const result = await api.post<ResponseMessage>(`${DPath}`, data);
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async function putAssessment(data?: IAssessment<"UPDATE">): Promise<ResponseMessage> {
    try {
      const result = await api.put<ResponseMessage>(`${DPath}/${data?.id}`, data);
      return result.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  return {
    postAssessment,
    putAssessment,
  };
}
