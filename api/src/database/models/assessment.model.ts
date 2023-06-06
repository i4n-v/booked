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
import AssessmentDto from '../../dto/assessment/assessment.dto';
import AssessmentCreateDto from '../../dto/assessment/assessmentCreate.dto';

@Table
export default class Assessment extends Model<AssessmentDto, AssessmentCreateDto> {
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
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => Book)
  book_id: string;
}
