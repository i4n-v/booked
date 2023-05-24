import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Book from './book.model';
import BookCategoryCreateDto from '../../dto/bookCategory/bookCategoryCreate.dto';
import BookCategoryDto from '../../dto/bookCategory/bookCategory.dto';
import Category from './category.model';

@Table
export default class BookCategory extends Model<BookCategoryDto, BookCategoryCreateDto> {
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
  @ForeignKey(() => Category)
  category_id: string;
}
