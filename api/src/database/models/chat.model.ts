import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './user.model';
import ChatDto from '../../dto/chat/chat.dto';
import ChatCreateDto from '../../dto/chat/chatCreate.dto';
import Message from './message.model';
import UserChat from './userChat.model';

@Table
export default class Chat extends Model<ChatDto, ChatCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  name: string;

  @BelongsToMany(() => User, () => UserChat, 'chat_id', 'user_id')
  users: User[];

  @HasMany(() => UserChat, 'chat_id')
  user_chats: Message[];

  @HasMany(() => Message)
  messages: Message[];
}
