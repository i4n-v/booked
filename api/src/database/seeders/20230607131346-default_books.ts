import { faker } from '@faker-js/faker';
import BookCreateDto from '../../dto/book/bookCreate.dto';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';
import { Migration } from 'sequelize-cli';

interface Book extends BookCreateDto {}

const seeder: Migration = {
  async up(queryInterface) {
    const users = await sequelizeConnection.model('User').findAll({
      limit: 40,
      attributes: ['id'],
    });

    const fakeBooks: Book[] = users.map(({ id }) => ({
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      price: faker.datatype.float({ min: 0, max: 100 }),
      photo_url: faker.image.imageUrl(),
      file_url: faker.internet.url(),
      user_id: id,
    }));

    await queryInterface.bulkInsert('Books', fakeBooks, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Books', {});
  },
};

module.exports = seeder;
