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
  BeforeValidate,
} from 'sequelize-typescript';
import UserDto from '../../dto/user/user.dto';
import UserCreateDto from '../../dto/user/userCreate.dto';
import userRepository from '../../repositories/user.repository';
import { encrypt } from '../../utils';
import Assessment from './assessment.model';
import Acquisition from './acquisition.model';
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
  @Column({
    type: DataType.STRING,
    validate: {
      notNull: {
        msg: 'O nome é requerido',
      },
    },
  })
  name: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  user_name: string;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: {
      notNull: {
        msg: 'O e-mail é requerido',
      },
      isEmail: {
        msg: 'E-mail inválido',
      },
    },
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: {
      notNull: {
        msg: 'O salt é requerido',
      },
    },
  })
  salt: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: {
      notNull: {
        msg: 'A senha é requerida',
      },
    },
  })
  password: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    validate: {
      notNull: {
        msg: 'O e-mail é requerido',
      },
      isDate: {
        args: true,
        msg: 'Data de nascimento inválida.',
      },
    },
  })
  birth_date: Date;

  @Column(DataType.STRING)
  photo_url: string;

  @Column(DataType.STRING)
  description: string;

  @HasMany(() => Book, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  books: Book[];

  @BelongsToMany(() => Book, () => Assessment, 'user_id')
  rated_books: Book[];

  @BelongsToMany(() => Book, () => Acquisition, 'user_id')
  acquisitions: Acquisition[];

  @BeforeValidate
  static async createUserName(userCreateDto: UserCreateDto) {
    if (userCreateDto.name) {
      const firstName = userCreateDto.name.split(' ')[0].toLocaleLowerCase();
      const countUsers = await userRepository.countByUserName(firstName);
      userCreateDto.user_name = `${firstName}#${countUsers}`;
    }
  }

  @BeforeValidate
  static async hashPassword(userCreateDto: UserCreateDto) {
    const [hashedPassword, salt] = await encrypt.hash(userCreateDto.password);

    userCreateDto.password = hashedPassword;
    userCreateDto.salt = salt;
  }
}
