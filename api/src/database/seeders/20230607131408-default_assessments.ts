import { faker } from '@faker-js/faker';
import { QueryInterface, Sequelize } from 'sequelize';
const { v4: uuidv4 } = require('uuid');

interface Assessment {
    id: string;
    number: number;
    user_id: string;
    booke_id: string;
    createdAt: Date;
    updatedAt: Date;
}

const generateFakeAssessment = (): Assessment => {
    return {
        id: uuidv4(),
        number: faker.datatype.number(),
        user_id: uuidv4(),
        booke_id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
};

const fakeAssessment: Assessment[] = Array.from({ length: 40 }, generateFakeAssessment);

export const up = async (queryInterface: QueryInterface, _: Sequelize) => {
    await queryInterface.bulkInsert('Assessments', fakeAssessment, {});
};

export const down = async (queryInterface: QueryInterface, _: Sequelize) => {
    await queryInterface.bulkDelete('Assessments', {});
};
