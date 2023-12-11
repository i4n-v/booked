import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './user.model';
import FollowerCreateDto from '../../dto/follower/followerCreate.dto';
import FollowerDto from '../../dto/follower/follower.dto';

@Table
export default class Follower extends Model<FollowerDto, FollowerCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  user_id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  followed_id: string;
}
