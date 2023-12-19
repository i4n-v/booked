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
import Acquisition from './acquisition.model';
import Assessment from './assessment.model';
import BookCategory from './bookCategory.model';
import Category from './category.model';
import User from './user.model';
import BookDto from '../../dto/book/book.dto';
import BookCreateDto from '../../dto/book/bookCreate.dto';
import Comment from './comment.model';
import Solicitation from './solicitation.model';
import Wishe from './wishe.model';
import Message from './message.model';
import MessageBook from './messageBook.model';

@Table
export default class Book extends Model<BookDto, BookCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING(2000))
  description: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  price: number;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  free_pages: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  photo_url: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  file_url: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  user_id: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Category, () => BookCategory, 'book_id')
  categories: Category[];

  @BelongsToMany(() => User, () => Assessment, 'book_id')
  user_raters: User[];

  @BelongsToMany(() => User, () => Acquisition, 'book_id')
  acquisitions: Acquisition[];

  @BelongsToMany(() => User, () => Solicitation, 'book_id')
  solicitations: Solicitation[];

  @BelongsToMany(() => User, () => Wishe, 'book_id')
  wishes: Wishe[];

  @HasMany(() => Comment)
  comments: Comment[];

  @BelongsToMany(() => Message, () => MessageBook, 'book_id', 'message_id')
  messages: Message[];
}
