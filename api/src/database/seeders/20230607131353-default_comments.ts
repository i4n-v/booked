import { faker } from '@faker-js/faker';
import { QueryInterface, Sequelize } from 'sequelize';
const { v4: uuidv4 } = require('uuid');

interface Comment {
  id: string;
  description: string;
  user_id: string;
  booke_id: string;
  refered_by: string;
  createdAt: Date;
  updatedAt: Date;
}

const generateFakeComment = (): Comment => {
  return {
    id: uuidv4(),
    description: faker.lorem.sentence(),
    user_id: uuidv4(),
    booke_id: uuidv4(),
    refered_by: faker.lorem.sentence(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const fakeComment: Comment[] = Array.from({ length: 40 }, generateFakeComment);

export const up = async (queryInterface: QueryInterface, _: Sequelize) => {
  await queryInterface.bulkInsert('Comments', fakeComment, {});
};

export const down = async (queryInterface: QueryInterface, _: Sequelize) => {
  await queryInterface.bulkDelete('Comments', {});
};
