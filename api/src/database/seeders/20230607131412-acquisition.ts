import { v4 } from 'uuid';
import { Migration } from 'sequelize-cli';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';
import { randomNumbers } from '../../utils';
import AcquisitionCreateDto from '../../dto/acquisition/acquisitionCreate.dto';

interface Acquisition extends AcquisitionCreateDto {
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

      const acquisitions: Acquisition[] = [];

      books.forEach(({ id }) => {
        const indexes = randomNumbers(0, users.length - 1, 10);
        indexes.forEach((index) => {
          acquisitions.push({
            id: v4(),
            user_id: users[index].id,
            book_id: id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });

      await queryInterface.bulkInsert('Acquisitions', acquisitions, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Acquisitions', {});
  },
};

export = seeder;
