import IBook from "../../commons/IBook";
import IUser from "../../commons/IUser";

interface Message {
  id: string;
  chat_id: string;
  sender: IUser;
  receiver: IUser;
  read: boolean;
  content: string;
  photo_url: string;
  books: IBook[];
  createdAt?: Date;
  updatedAt?: Date;
  [x: string]: any;
}

interface MessageCreate {
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  photo?: File;
  books?: string[];
}

enum MessageTypes {
  SEND,
}

export type IMessage<T extends keyof typeof MessageTypes | null = null> =
  T extends "SEND" ? MessageCreate : Message;
