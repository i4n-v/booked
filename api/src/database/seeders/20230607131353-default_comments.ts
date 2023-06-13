import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';
import CommentCreateDto from '../../dto/comment/commentCreate.dto';
import { Migration } from 'sequelize-cli';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';
import { randomNumbers } from '../../utils';

interface Comment extends CommentCreateDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const seeder: Migration = {
  async up(queryInterface) {
    await sequelizeConnection.transaction(async (transaction) => {
      const users = await sequelizeConnection.model('User').findAll({
        limit: 40,
        attributes: ['id'],
        transaction,
      });

      const books = await sequelizeConnection.model('Book').findAll({
        limit: 40,
        attributes: ['id'],
        transaction,
      });

      const comments: Comment[] = [];

      books.forEach(({ id }) => {
        const indexes = randomNumbers(0, users.length - 1, 10);
        indexes.forEach((index) => {
          comments.push({
            id: v4(),
            description: faker.lorem.sentence(),
            user_id: users[index].id,
            book_id: id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });

      await queryInterface.bulkInsert('Comments', comments, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Comments', {});
  },
};

export = seeder;
