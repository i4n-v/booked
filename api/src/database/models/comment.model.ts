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
import CommentDto from '../../dto/comment/comment.dto';
import CommentCreateDto from '../../dto/comment/commentCreate.dto';

@Table
export default class Comment extends Model<CommentDto, CommentCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column(DataType.STRING(2000))
  description: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  user_id: string;

  @Column(DataType.UUID)
  @ForeignKey(() => Book)
  book_id: string;

  @ForeignKey(() => Comment)
  @Column(DataType.UUID)
  refered_by: string;

  @BelongsTo(() => User)
  user: User[];

  @BelongsTo(() => Book)
  book: Book[];

  @HasMany(() => Comment, { foreignKey: 'refered_by', onDelete: 'CASCADE' })
  referenced_comments: Comment[];

  @BelongsTo(() => Comment)
  reference_comment: Comment;
}
