import IAssessment from "../../commons/IAssessment";
import { ResponseMessage } from "../../commons/ResponseMessage";
import api from "../../configs/api";

export default function useAssessment() {

  const DPath = 'assessments'

  async function postAssessment(data?: IAssessment<"CREATE">): Promise<ResponseMessage> {
    try {
      const result = await api.post<ResponseMessage>(`${DPath}`, data);
      return result.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  async function putAssessment(data?: IAssessment<"UPDATE">): Promise<ResponseMessage> {
    try {
      const result = await api.put<ResponseMessage>(`${DPath}/${data?.id}`, data);
      return result.data;
    } catch (error: any) {
      return error.response?.data?.message;
    }
  }

  return {
    postAssessment,
    putAssessment
  }
}