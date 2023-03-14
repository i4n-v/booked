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
import Assessment from './assessment.model';
import BookCategory from './bookCategory.model';
import Category from './category.model';
import User from './user.model';

@Table
export default class Book extends Model {
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
  decription: string;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  price: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  photo_url: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  url: string;

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
}
