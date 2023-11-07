import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import SolicitationDto from '../../dto/solicitation/solicitation.dto';
import SolicitationCreateDto from '../../dto/solicitation/solicitationCreate.dto';
import Book from './book.model';
import User from './user.model';

@Table
export default class Solicitation extends Model<SolicitationDto, SolicitationCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.ENUM('pending', 'canceled', 'accepted', 'refused'))
  status: 'pending' | 'canceled' | 'accepted' | 'refused';

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  user_id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => Book)
  book_id: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Book)
  book: Book;
}
