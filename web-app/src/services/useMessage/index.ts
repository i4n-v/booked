import api from "../../configs/api";
import { IMessage } from "./types";

export default function useMessage(){
    const DPath = '/messages'
    async function createMessage(message: IMessage<"SEND">){
        try {
        const response = await api.post(DPath,message)
            return response.data
        } catch (error: any) {
            return error.response?.data?.message;
        }
    }

    return {
        createMessage
    }
}