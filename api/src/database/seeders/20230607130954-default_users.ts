import { faker } from '@faker-js/faker';
import UserCreateDto from '../../dto/user/userCreate.dto';
import { Migration } from 'sequelize-cli';
import { v4 } from 'uuid';

interface User extends Omit<UserCreateDto, 'confirm_password'> {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const seeder: Migration = {
  async up(queryInterface) {
    const generateFakeUser = (): User => {
      return {
        id: v4(),
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
        user_name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birth_date: faker.date.between({ from: '1970-01-01', to: '2003-12-31' }),
        description: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    };

    const fakeUsers: User[] = Array.from({ length: 40 }, generateFakeUser);

    await queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', {});
  },
};

module.exports = seeder;
