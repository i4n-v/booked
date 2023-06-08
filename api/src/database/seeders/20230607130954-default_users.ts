import { faker } from '@faker-js/faker';
import { QueryInterface, Sequelize } from 'sequelize';
import UserCreateDto from '../../dto/user/userCreate.dto';

interface User extends Omit<UserCreateDto, "confirm_password"> {
  description: string;
}

export const up = async (queryInterface: QueryInterface, _: Sequelize) => {

  const generateFakeUser = (): User => {
    return {
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      user_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birth_date: faker.date.between('1970-01-01', '2003-12-31'),
      description: faker.lorem.sentence(),
    };
  };

  const fakeUsers: User[] = Array.from({ length: 40 }, generateFakeUser);

  await queryInterface.bulkInsert('Users', fakeUsers, {});
};

export const down = async (queryInterface: QueryInterface, _: Sequelize) => {
  await queryInterface.bulkDelete('Users', {});
};
