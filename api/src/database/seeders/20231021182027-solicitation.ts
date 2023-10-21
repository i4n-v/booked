import { v4 } from 'uuid';
import { Migration } from 'sequelize-cli';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';
import { randomNumbers } from '../../utils';
import SolicitationCreateDto from '../../dto/solicitation/solicitationCreate.dto';
import randomNumber from '../../utils/randomNumber';

interface Acquisition extends SolicitationCreateDto {
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

      const solicitations: Acquisition[] = [];

      const status = ['pending', 'canceled', 'accepted', 'refused'];

      books.forEach(({ id }) => {
        const indexes = randomNumbers(0, users.length - 1, 10);

        indexes.forEach((index) => {
          const indexStatus = randomNumber(0, 3);
          solicitations.push({
            id: v4(),
            status: status[indexStatus] as any,
            user_id: users[index].id,
            book_id: id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });

      await queryInterface.bulkInsert('Solicitations', solicitations, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Solicitations', {});
  },
};

export = seeder;
