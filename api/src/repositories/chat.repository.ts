import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Chat from '../database/models/chat.model';
import ChatCreateDto from '../dto/chat/chatCreate.dto';
import { Transaction, WhereOptions } from 'sequelize';
import ChatDto from '../dto/chat/chat.dto';
import { Op } from 'sequelize';

class ChatRepository {
  private repository: Repository<Chat>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Chat);
  }

  async findById(id: string, transaction?: Transaction) {
    return await this.repository.findByPk(id, {
      include: {
        model: sequelizeConnection.model('User'),
        as: 'users',
        attributes: ['id'],
        required: true,
        through: { attributes: [] },
      },
      transaction,
    });
  }

  async findByIdWithUsers(id: string, sender_id: string, transaction?: Transaction) {
    return await this.repository.findByPk(id, {
      attributes: {
        exclude: ['first_user_id', 'second_user_id'],
        include: [
          [
            sequelizeConnection.literal(
              `(
                SELECT COUNT("Messages".id)
                FROM "Messages" LEFT JOIN "ReadedMessages"
                  ON "Messages".id = "ReadedMessages".message_id
                WHERE
                  "Messages".chat_id = "Chat".id
                  AND "Messages".sender_id <> '${sender_id}'
                  AND "ReadedMessages".user_id IS NULL
              )`
            ),
            'unreaded_messages',
          ],
        ],
      },
      transaction,
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'users',
          attributes: ['id', 'name', 'user_name', 'photo_url'],
          required: true,
          through: { attributes: [] },
        },
        {
          model: sequelizeConnection.model('Message'),
          as: 'messages',
          attributes: [
            'id',
            'sender_id',
            'content',
            'createdAt',
            'photo_url',
            [
              sequelizeConnection.literal(`
                EXISTS (
                  SELECT id FROM "ReadedMessages"
                  WHERE "ReadedMessages".message_id = "Message".id AND "ReadedMessages".user_id <> '${sender_id}'
                )
            `),
              'read',
            ],
          ],
          order: [['createdAt', 'DESC']],
          limit: 1,
        },
      ],
    });
  }

  async countUnreadedByReceiverId(id: string, transaction?: Transaction) {
    return await this.repository.count({
      distinct: true,
      transaction,
      where: {
        '$messages->readed_messages.user_id$': null,
      },
      include: [
        {
          model: sequelizeConnection.model('UserChat'),
          attributes: [],
          as: 'user_chats',
          where: {
            user_id: id,
          },
        },
        {
          required: true,
          model: sequelizeConnection.model('Message'),
          as: 'messages',
          attributes: [],
          where: {
            sender_id: {
              [Op.not]: id,
            },
          },
          include: [
            {
              required: false,
              model: sequelizeConnection.model('ReadedMessage'),
              attributes: [],
              as: 'readed_messages',
            },
          ],
        },
      ],
    });
  }

  async findAndCountAll(
    userId: string,
    page: number,
    limit: number,
    options?: WhereOptions<ChatDto>
  ) {
    return await this.repository.findAndCountAll({
      limit,
      distinct: true,
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
        include: [
          [
            sequelizeConnection.literal(
              `(
                SELECT COUNT("Messages".id)
                FROM "Messages" LEFT JOIN "ReadedMessages"
                  ON "Messages".id = "ReadedMessages".message_id
                WHERE
                  "Messages".chat_id = "Chat".id
                  AND "Messages".sender_id <> '${userId}'
                  AND "ReadedMessages".user_id IS NULL
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
          as: 'users',
          attributes: ['id', 'name', 'user_name', 'photo_url'],
          required: true,
          through: { attributes: [] },
        },
        {
          model: sequelizeConnection.model('Message'),
          as: 'messages',
          attributes: [
            'id',
            'sender_id',
            'content',
            'createdAt',
            [
              sequelizeConnection.literal(`
              EXISTS (
                SELECT id FROM "ReadedMessages"
                WHERE "ReadedMessages".message_id = "Message".id AND "ReadedMessages".user_id <> '${userId}'
              )
          `),
              'read',
            ],
          ],
          order: [['createdAt', 'DESC']],
          limit: 1,
        },
      ],
    });
  }

  async create(chat: ChatCreateDto, transaction?: Transaction) {
    return await this.repository.create(chat, { transaction });
  }

  async update(id: string, chat: ChatCreateDto, transaction?: Transaction) {
    return await this.repository.update(chat, {
      where: {
        id: id,
      },
      transaction,
    });
  }
}

export default new ChatRepository();
