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
import Message from './message.model';
import Book from './book.model';
import MessageBookDto from '../../dto/messageBook/messageBook.dto';
import MessageBookCreateDto from '../../dto/messageBook/messageBookCreate.dto';

@Table
export default class MessageBook extends Model<MessageBookDto, MessageBookCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => Book)
  book_id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => Message)
  message_id: string;

  @BelongsTo(() => Book, 'book_id')
  book: Book;

  @BelongsTo(() => Message, 'message_id')
  message: Message;
}
