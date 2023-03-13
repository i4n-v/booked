import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Max,
  Min,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Book from './book.model';
import User from './user.model';

@Table
export default class Assessment extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Min(0)
  @Max(5)
  @Column(DataType.INTEGER)
  number: number;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  user_id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => Book)
  book_id: string;
}
