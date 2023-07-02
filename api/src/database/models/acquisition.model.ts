import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import AcquisitionDto from '../../dto/acquisition/acquisition.dto';
import AcquisitionCreateDto from '../../dto/acquisition/acquisitionCreate.dto';
import Book from './book.model';
import User from './user.model';

@Table
export default class Acquisition extends Model<AcquisitionDto, AcquisitionCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  marked_page: number;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  user_id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => Book)
  book_id: string;
}
