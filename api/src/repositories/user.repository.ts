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
          [
            sequelizeConnection.literal(`
              EXISTS (
                SELECT "Followers".id
                FROM "Followers"
                WHERE
                  "Followers".followed_id = "User".id
                  AND "Followers".follower_id = '${auth.id}'
              )
            `),
            'followed',
          ],
        ],
      },
      include: [
        {
          model: sequelizeConnection.model('Chat'),
          attributes: ['id'],
          required: false,
          as: 'chats',
          through: {
            attributes: [],
          },
          where: {
            id: {
              [Op.and]: [
                {
                  [Op.in]: sequelizeConnection.literal(`(
                    SELECT "UserChats".chat_id
                    FROM "UserChats"
                    WHERE "UserChats".user_id = "User".id
                  )`),
                },
                {
                  [Op.in]: sequelizeConnection.literal(`(
                    SELECT "UserChats".chat_id
                    FROM "UserChats"
                    WHERE "UserChats".user_id = '${auth.id}'
                  )`),
                },
              ],
            },
          },
        },
      ],
      where: options,
    });
  }

  async findById(
    id: string,
    follower_id: string | null,
    options?: Omit<FindOptions<UserDto>, 'where'>
  ) {
    const includeAttributes = [
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
            SELECT COUNT("Followers".id)
            FROM "Followers"
            WHERE "Followers".followed_id = "User".id
          )
        `),
        'total_followers',
      ],
    ];

    if (follower_id) {
      includeAttributes.push([
        sequelizeConnection.literal(`
        EXISTS (
          SELECT "Followers".id
          FROM "Followers"
          WHERE
            "Followers".followed_id = "User".id
            AND "Followers".follower_id = '${follower_id}'
            AND "Followers".follower_id IS NOT NULL
        )
      `),
        'followed',
      ]);
    }

    return await this.repository.findByPk(id, {
      attributes: {
        exclude: ['password', 'updatedAt'],
        include: includeAttributes as any,
      },
      ...options,
    });
  }

  async findByIdWithHash(id: string) {
    return await this.repository.findByPk(id, {
      attributes: ['id', 'password'],
    });
  }

  async findByCredentials(userLogin: string, request: Request) {
    const {
      headers: { host },
    } = request;

    const protocol = process.env.NODE_ENV !== 'development' ? 'https' : 'http';

    return await this.repository.findOne({
      attributes: {
        exclude: ['photo_url'],
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
      where: {
        [Op.or]: [{ user_name: userLogin }, { email: userLogin }],
      },
    });
  }
}

export default new UserRepository();
