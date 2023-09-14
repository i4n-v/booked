import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Chat from '../database/models/chat.model';
import ChatCreateDto from '../dto/chat/chatCreate.dto';
import { WhereOptions } from 'sequelize';
import ChatDto from '../dto/chat/chat.dto';
import { Request } from 'express';

class ChatRepository {
  private repository: Repository<Chat>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Chat);
  }

  async findById(id: string) {
    return await this.repository.findByPk(id);
  }

  async findByIdWithUsers(id: string, request: Request) {
    const {
      headers: { host },
    } = request;

    const protocol = process.env.NODE_ENV !== 'development' ? 'https' : 'http';

    return await this.repository.findByPk(id, {
      attributes: {
        exclude: ['first_user_id', 'second_user_id'],
        include: [
          [
            sequelizeConnection.literal(
              `(
                SELECT COUNT(id)
                FROM "Messages"
                WHERE "Messages".chat_id = "Chat".id
              )`
            ),
            'unreaded_messages',
          ],
        ],
      },
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'first_user',
          attributes: [
            'id',
            'name',
            'user_name',
            [
              sequelizeConnection.literal(`
              CASE
                WHEN first_user.photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', first_user.photo_url)
                ELSE first_user.photo_url
              END
          `),
              'photo_url',
            ],
          ],
        },
        {
          model: sequelizeConnection.model('User'),
          as: 'second_user',
          attributes: [
            'id',
            'name',
            'user_name',
            [
              sequelizeConnection.literal(`
              CASE
                WHEN second_user.photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', second_user.photo_url)
                ELSE second_user.photo_url
              END
          `),
              'photo_url',
            ],
          ],
        },
        {
          model: sequelizeConnection.model('Message'),
          as: 'messages',
          attributes: ['id', 'sender_id', 'read', 'content', 'createdAt'],
          order: [['createdAt', 'DESC']],
          limit: 1,
        },
      ],
    });
  }

  async findByUsers(first_user_id: string, second_user_id: string) {
    return await this.repository.findOne({
      where: {
        first_user_id: [first_user_id, second_user_id],
        second_user_id: [first_user_id, second_user_id],
      },
    });
  }

  async findAndCountAll(
    page: number,
    limit: number,
    request: Request,
    options?: WhereOptions<ChatDto>
  ) {
    const {
      headers: { host },
      auth,
    } = request;

    const protocol = process.env.NODE_ENV !== 'development' ? 'https' : 'http';

    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [
        [
          sequelizeConnection.literal(
            `(
              SELECT MAX("createdAt")
              FROM "Messages"
              WHERE "Messages"."chat_id" = "Chat"."id"
            )`
          ),
          'DESC',
        ],
      ],
      attributes: {
        exclude: ['first_user_id', 'second_user_id'],
        include: [
          [
            sequelizeConnection.literal(
              `(
                SELECT COUNT(id)
                FROM "Messages"
                WHERE
                  "Messages".chat_id = "Chat".id
                  AND "Messages".receiver_id = '${auth.id}'
              )`
            ),
            'unreaded_messages',
          ],
        ],
      },
      where: options,
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'first_user',
          attributes: [
            'id',
            'name',
            'user_name',
            [
              sequelizeConnection.literal(`
              CASE
                WHEN first_user.photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', first_user.photo_url)
                ELSE first_user.photo_url
              END
          `),
              'photo_url',
            ],
          ],
        },
        {
          model: sequelizeConnection.model('User'),
          as: 'second_user',
          attributes: [
            'id',
            'name',
            'user_name',
            [
              sequelizeConnection.literal(`
              CASE
                WHEN second_user.photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', second_user.photo_url)
                ELSE second_user.photo_url
              END
          `),
              'photo_url',
            ],
          ],
        },
        {
          model: sequelizeConnection.model('Message'),
          as: 'messages',
          attributes: ['id', 'sender_id', 'read', 'content', 'createdAt'],
          order: [['createdAt', 'DESC']],
          limit: 1,
        },
      ],
    });
  }

  async create(chat: ChatCreateDto) {
    return await this.repository.create(chat);
  }
}

export default new ChatRepository();
