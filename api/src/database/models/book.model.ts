import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
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
  @Column(DataType.STRING)
  description: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  price: number;

  @AllowNull(false)
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
}
