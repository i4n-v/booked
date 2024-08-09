import { IMessage } from "./Message";
import IUser from "./User";

export interface IChat {
  id?: string;
  users: IUser[];
  unreaded_messages: number;
  messages: IMessage[];
  updatedAt?: Date;
  createdAt?: Date;
  name: string;
}

export interface GroupChatCreate {
  name: string;
  users: string[];
}

export interface GroupChatUpdate {
  id: string;
  name: string;
  users: string[];
}
