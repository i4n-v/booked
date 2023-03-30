import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import User from './user.model';
import AuthenticationCreateDto from '../../dto/authentication/authenticationCreate.dto';
import AuthenticationDto from '../../dto/authentication/authentication.dto';

@Table
export default class Authentication extends Model<AuthenticationDto, AuthenticationCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING,
    validate: {
      notNull: {
        msg: 'O token é requerido',
      },
    },
  })
  token: string;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  valid: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  expiry_date: Date;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  user_id: string;

  @BelongsTo(() => User)
  user: User;
}
