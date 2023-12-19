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
import Message from './message.model';
import ReadedMessageDto from '../../dto/readedMessage/readedMessage.dto';
import ReadedMessageCreateDto from '../../dto/readedMessage/readMessageCreate.dto';

@Table
export default class ReadedMessage extends Model<ReadedMessageDto, ReadedMessageCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  user_id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => Message)
  message_id: string;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Message, 'message_id')
  message: Message;
}
