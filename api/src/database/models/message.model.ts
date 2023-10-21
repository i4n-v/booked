import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './user.model';
import Chat from './chat.model';
import MessageDto from '../../dto/message/message.dto';
import MessageCreateDto from '../../dto/message/messageCreate.dto';

@Table
export default class Message extends Model<MessageDto, MessageCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  read: boolean;

  @AllowNull(true)
  @Column(DataType.STRING(7000))
  content: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  photo_url: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => Chat)
  chat_id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  sender_id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  receiver_id: string;

  @BelongsTo(() => Chat)
  chat: Chat;

  @BelongsTo(() => User, 'sender_id')
  sender: User;

  @BelongsTo(() => User, 'receiver_id')
  receiver: User;
}
