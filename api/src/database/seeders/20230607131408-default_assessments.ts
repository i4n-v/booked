import { faker } from '@faker-js/faker';
import AssessmentCreateDto from '../../dto/assessment/assessmentCreate.dto';
import { v4 } from 'uuid';
import { Migration } from 'sequelize-cli';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';
import { randomNumbers } from '../../utils';

interface Assessment extends AssessmentCreateDto {
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

      const assessments: Assessment[] = [];

      books.forEach(({ id }) => {
        const indexes = randomNumbers(0, users.length - 1, 10);
        indexes.forEach((index) => {
          assessments.push({
            id: v4(),
            number: faker.number.float({ min: 0, max: 5 }),
            user_id: users[index].id,
            book_id: id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });

      await queryInterface.bulkInsert('Assessments', assessments, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Assessments', {});
  },
};

export = seeder;
