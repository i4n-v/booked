import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Book from './book.model';
import User from './user.model';

@Table
export default class Comment extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column(DataType.STRING)
  description: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  user_id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => Book)
  book_id: string;

  @HasMany(() => Comment, { foreignKey: 'refered_by', onDelete: 'CASCADE' })
  referenced_comments: Comment[];

  @ForeignKey(() => Comment)
  @Column(DataType.UUID)
  refered_by: string;

  @BelongsTo(() => Comment)
  reference_comment: Comment;
}
