import {
  AllowNull,
  BeforeCreate,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  BeforeValidate,
} from 'sequelize-typescript';
import UserDto from '../../dto/user/user.dto';
import UserCreateDto from '../../dto/user/userCreate.dto';
import userRepository from '../../repositories/user.repository';
import { encrypt } from '../../utils';
import Assessment from './assessment.model';
import Book from './book.model';

@Table
export default class User extends Model<UserDto, UserCreateDto> {
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

  @Column(DataType.STRING)
  photo_url: string;

  @Column(DataType.STRING)
  description: string;

  @HasMany(() => Book, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  books: Book[];

  @BelongsToMany(() => Book, () => Assessment, 'user_id')
  rated_books: Book[];

  @BeforeValidate
  static async createUserName(userCreateDto: UserCreateDto) {
    console.log(userCreateDto);
    const firstName = userCreateDto.name.split(' ')[0].toLocaleLowerCase();
    const countUsers = await userRepository.countByUserName(firstName);
    userCreateDto.user_name = `${firstName}#${countUsers}`;
  }

  @BeforeCreate
  static async hashPassword(userCreateDto: UserCreateDto) {
    const hashedPassword = await encrypt.hash(userCreateDto.password);
    userCreateDto.password = hashedPassword;
  }
}
