import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Message from '../database/models/message.model';
import MessageCreateDto from '../dto/message/messageCreate.dto';
import { FindOptions, Transaction, WhereOptions } from 'sequelize';
import MessageDto from '../dto/message/message.dto';
import { Request } from 'express';

class MessageRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Message);
  }

  async findByIdWithUsers(id: string, request: Request, transaction?: Transaction) {
    const {
      headers: { host },
    } = request;

    const protocol = process.env.NODE_ENV !== 'development' ? 'https' : 'http';

    return await this.repository.findByPk(id, {
      attributes: {
        exclude: ['sender_id'],
        include: [
          [
            sequelizeConnection.literal(`
              CASE
                WHEN "Message".photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', "Message".photo_url)
                ELSE "Message".photo_url
              END
          `),
            'photo_url',
          ],
        ],
      },
      transaction,
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'sender',
          attributes: [
            'id',
            'name',
            'user_name',
            [
              sequelizeConnection.literal(`
              CASE
                WHEN sender.photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', sender.photo_url)
                ELSE sender.photo_url
              END
          `),
              'photo_url',
            ],
          ],
        },
        {
          model: sequelizeConnection.model('Book'),
          as: 'books',
          through: { attributes: [] },
          attributes: {
            exclude: ['user_id', 'file_url'],
            include: [
              [
                sequelizeConnection.literal(`
                  CASE
                    WHEN "Book".photo_url IS NOT NULL THEN CONCAT('${
                      protocol + '://' + host
                    }', "Book".photo_url)
                    ELSE "Book".photo_url
                  END
              `),
                'photo_url',
              ],
              [
                sequelizeConnection.literal(
                  `(
                    SELECT
                      CASE
                        WHEN (SUM(number) / COUNT(id)) IS NULL THEN 0
                        ELSE (SUM(number) / COUNT(id))
                      END
                    FROM "Assessments"
                    WHERE "Assessments".book_id = "Book".id
                  )`
                ),
                'rating',
              ],
              [
                sequelizeConnection.literal(
                  `(
                    SELECT COUNT(id)
                    FROM "Assessments"
                    WHERE "Assessments".book_id = "Book".id
                  )`
                ),
                'total_users_rating',
              ],
            ],
          },
          include: [
            {
              model: sequelizeConnection.model('User'),
              as: 'user',
              attributes: ['id', 'name', 'user_name'],
            },
          ],
        },
      ],
    });
  }

  async findById(id: string) {
    return await this.repository.findByPk(id);
  }

  async findAll(options: FindOptions<MessageDto>) {
    return await this.repository.findAll(options);
  }

  async findAndCountAll(
    page: number,
    limit: number,
    request: Request,
    options?: WhereOptions<MessageDto>
  ) {
    const {
      headers: { host },
      auth,
    } = request;

    const protocol = process.env.NODE_ENV !== 'development' ? 'https' : 'http';

    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'desc']],
      attributes: {
        exclude: ['sender_id'],
        include: [
          [
            sequelizeConnection.literal(`
              EXISTS (
                SELECT id FROM "ReadedMessages"
                WHERE "ReadedMessages".message_id = "Message".id AND "ReadedMessages".user_id = '${auth.id}'
              )
          `),
            'read',
          ],
          [
            sequelizeConnection.literal(`
              CASE
                WHEN "Message".photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', "Message".photo_url)
                ELSE "Message".photo_url
              END
          `),
            'photo_url',
          ],
        ],
      },
      where: options,
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'sender',
          attributes: [
            'id',
            'name',
            'user_name',
            [
              sequelizeConnection.literal(`
              CASE
                WHEN sender.photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', sender.photo_url)
                ELSE sender.photo_url
              END
          `),
              'photo_url',
            ],
          ],
        },
        {
          model: sequelizeConnection.model('Book'),
          as: 'books',
          through: { attributes: [] },
          attributes: {
            exclude: ['user_id', 'file_url'],
            include: [
              [
                sequelizeConnection.literal(`
                  CASE
                    WHEN "Book".photo_url IS NOT NULL THEN CONCAT('${
                      protocol + '://' + host
                    }', "Book".photo_url)
                    ELSE "Book".photo_url
                  END
              `),
                'photo_url',
              ],
              [
                sequelizeConnection.literal(
                  `(
                    SELECT
                      CASE
                        WHEN (SUM(number) / COUNT(id)) IS NULL THEN 0
                        ELSE (SUM(number) / COUNT(id))
                      END
                    FROM "Assessments"
                    WHERE "Assessments".book_id = "Book".id
                  )`
                ),
                'rating',
              ],
              [
                sequelizeConnection.literal(
                  `(
                    SELECT COUNT(id)
                    FROM "Assessments"
                    WHERE "Assessments".book_id = "Book".id
                  )`
                ),
                'total_users_rating',
              ],
            ],
          },
          include: [
            {
              model: sequelizeConnection.model('User'),
              as: 'user',
              attributes: ['id', 'name', 'user_name'],
            },
          ],
        },
      ],
    });
  }

  async create(chat: MessageCreateDto, transaction?: Transaction) {
    return await this.repository.create(chat, {
      transaction,
    });
  }

  async deleteById(id: string) {
    return await this.repository.destroy({
      where: {
        id,
      },
    });
  }
}

export default new MessageRepository();
