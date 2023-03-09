import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Book from './book.model';
import BookCategory from './bookCategory.model';

@Table
export default class Category extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @BelongsToMany(() => Book, () => BookCategory, 'category_id')
  books: Book[];
}
