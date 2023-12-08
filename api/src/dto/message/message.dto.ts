export default class MessageDto {
  id: string;
  chat_id: string;
  sender_id: string;
  read: boolean;
  content?: string;
  photo_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
