import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './user.model';
import Chat from './chat.model';
import MessageDto from '../../dto/message/message.dto';
import MessageCreateDto from '../../dto/message/messageCreate.dto';
import Book from './book.model';
import ReadedMessage from './readedMessage.model';

@Table
export default class Message extends Model<MessageDto, MessageCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

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

  @BelongsTo(() => Chat)
  chat: Chat;

  @BelongsTo(() => User, 'sender_id')
  sender: User;

  @BelongsToMany(() => Book, () => Book, 'message_id', 'book_id')
  books: Book;

  @BelongsToMany(() => User, () => ReadedMessage, 'message_id', 'user_id')
  readers: User[];

  @HasMany(() => ReadedMessage, 'message_id')
  readed_messages: ReadedMessage[];
}
