import User from '../database/models/user.model';
import UserCreateDto from '../dto/user/userCreate.dto';
import UserUpdateDto from '../dto/user/userUpdate.dto';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import { FindOptions, Op, WhereOptions } from 'sequelize';
import userUpdatePasswordDto from '../dto/user/userUpdatePassword.dto';
import UserDto from '../dto/user/user.dto';
import { Request } from 'express';

class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(User);
  }

  async create(user: UserCreateDto) {
    if (user.name) {
      const firstName = user.name.split(' ')[0].toLocaleLowerCase();
      const countUsers = await this.countByName(firstName);
      user.user_name = `${firstName}#${countUsers}`;
    }

    return await this.repository.create(user);
  }

  async update(id: string, user: UserUpdateDto | userUpdatePasswordDto) {
    return await this.repository.update(user, {
      where: {
        id,
      },
    });
  }

  async countByName(name: string) {
    return await this.repository.count({
      where: {
        user_name: {
          [Op.iLike]: `${name}%`,
        },
      },
    });
  }

  async findAndCountAll(
    page: number,
    limit: number,
    request: Request,
    options?: WhereOptions<UserDto>
  ) {
    const {
      headers: { host },
      auth,
    } = request;

    const protocol = process.env.NODE_ENV !== 'development' ? 'https' : 'http';

    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [['name', 'ASC']],
      attributes: {
        exclude: ['password', 'salt', 'updatedAt'],
        include: [
          [
            sequelizeConnection.literal(`
              CASE
                WHEN "User".photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', "User".photo_url)
                ELSE "User".photo_url
              END
          `),
            'photo_url',
          ],
        ],
      },
      include: [
        {
          model: sequelizeConnection.model('Chat'),
          attributes: ['id'],
          required: false,
          on: {
            [Op.or]: [
              { '$User.id$': { [Op.col]: 'chats.first_user_id' } },
              { '$User.id$': { [Op.col]: 'chats.second_user_id' } },
            ],
          },
          where: {
            [Op.or]: [{ first_user_id: auth.id }, { second_user_id: auth.id }],
          },
        },
      ],
      where: options,
    });
  }

  async findById(id: string, options?: Omit<FindOptions<UserDto>, 'where'>) {
    return await this.repository.findByPk(id, {
      attributes: {
        exclude: ['password', 'salt', 'updatedAt'],
        include: [
          [
            sequelizeConnection.literal(`
              (
                SELECT COUNT(id)
                FROM "Books"
                WHERE "Books".user_id = "User".id
              )
            `),
            'total_books',
          ],
          [
            sequelizeConnection.literal(`
              (
                SELECT COUNT(id)
                FROM "Acquisitions"
                WHERE "Acquisitions".user_id = "User".id
              )
            `),
            'total_acquitions',
          ],
          [
            sequelizeConnection.literal(`
              (
                SELECT COUNT(id)
                FROM "Followers"
                WHERE "Followers".followed_id = "User".id
              )
            `),
            'total_followers',
          ],
        ],
      },
      ...options,
    });
  }

  async findByCredentials(userLogin: string) {
    return await this.repository.findOne({
      where: {
        [Op.or]: [{ user_name: userLogin }, { email: userLogin }],
      },
    });
  }
}

export default new UserRepository();
