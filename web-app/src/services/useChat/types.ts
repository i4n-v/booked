import IUser from "../../commons/IUser";
import { IMessage } from "../useMessage/types";

export interface IChat {
  id?: string;
  first_user: IUser;
  second_user: IUser;
  unreaded_messages: number;
  messages: IMessage[];
}
