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
import CategoryDto from '../../dto/category/category.dto';
import CategoryCreateDto from '../../dto/category/categoryCreate.dto';

@Table
export default class Category extends Model<CategoryDto, CategoryCreateDto> {
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
