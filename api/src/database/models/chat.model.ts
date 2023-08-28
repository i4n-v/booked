import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './user.model';
import ChatDto from '../../dto/chat/chat.dto';
import ChatCreateDto from '../../dto/chat/chatCreate.dto';
import Message from './message.model';

@Table
export default class Chat extends Model<ChatDto, ChatCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  first_user_id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  second_user_id: string;

  @BelongsTo(() => User, 'first_user_id')
  first_user: User;

  @BelongsTo(() => User, 'second_user_id')
  second_user: User;

  @HasMany(() => Message)
  messages: Message[];
}
