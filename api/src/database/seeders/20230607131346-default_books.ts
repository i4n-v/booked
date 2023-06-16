import { faker } from '@faker-js/faker';
import BookCreateDto from '../../dto/book/bookCreate.dto';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';
import { Migration } from 'sequelize-cli';
import crypto from 'crypto';
import { v4 } from 'uuid';
import BookCategoryCreateDto from '../../dto/bookCategory/bookCategoryCreate.dto';
import { randomNumbers } from '../../utils';

interface Book extends BookCreateDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BookCategory extends BookCategoryCreateDto {
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

      const categories = await sequelizeConnection.model('Category').findAll({
        attributes: ['id'],
        transaction,
      });

      const books: Book[] = [];
      const bookCategories: BookCategory[] = [];

      users.forEach(({ id }) => {
        for (let i = 0; i < 6; i++) {
          const hash = crypto.randomBytes(16).toString('hex');

          books.push({
            id: v4(),
            user_id: id,
            name: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            price: faker.number.float({ min: 0, max: 100 }),
            photo_url: `${hash}-${faker.system.fileName()}.png`,
            file_url: `${hash}-${faker.system.fileName()}.pdf`,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      });

      books.forEach(({ id }) => {
        const indexes = randomNumbers(0, categories.length - 1, 3);

        indexes.forEach((index) => {
          bookCategories.push({
            id: v4(),
            book_id: id,
            category_id: categories[index].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });

      await queryInterface.bulkInsert('Books', books, { transaction });
      await queryInterface.bulkInsert('BookCategories', bookCategories, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Books', {});
  },
};

module.exports = seeder;
