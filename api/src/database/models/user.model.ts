import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import Assessment from './assessment.model';
import Book from './book.model';

@Table
export default class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  user_name: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  birth_date: Date;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  photo_url: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description: string;

  @HasMany(() => Book, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  books: Book[];

  @BelongsToMany(() => Book, () => Assessment, 'user_id')
  rated_books: Book[];
}
