import { faker } from '@faker-js/faker';
import UserCreateDto from '../../dto/user/userCreate.dto';
import { Migration } from 'sequelize-cli';
import { v4 } from 'uuid';
import { encrypt } from '../../utils';

interface User extends Omit<UserCreateDto, 'confirm_password'> {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const seeder: Migration = {
  async up(queryInterface) {
    const fakeUsers: User[] = [];

    for (let i = 0; i < 40; i++) {
      fakeUsers.push({
        id: v4(),
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
        user_name: faker.internet.userName(),
        email: faker.internet.email(),
        password: await encrypt.hash('12345678'),
        birth_date: faker.date.between({ from: '1970-01-01', to: '2003-12-31' }),
        description: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', {});
  },
};

module.exports = seeder;
