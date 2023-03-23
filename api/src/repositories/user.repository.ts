import User from '../database/models/user.model';
import UserCreateDto from '../dto/user/userCreate.dto';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import { Op } from 'sequelize';

class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(User);
  }

  async create(user: UserCreateDto) {
    if (user.name) {
      const firstName = user.name.split(' ')[0].toLocaleLowerCase();
      const countUsers = await userRepository.countByName(firstName);
      user.user_name = `${firstName}#${countUsers}`;
    }

    const createdUser = await this.repository.create(user);
    return createdUser;
  }

  async countByName(name: string) {
    const countUsers = await this.repository.count({
      where: {
        user_name: {
          [Op.like]: `${name}%`,
        },
      },
    });
    return countUsers;
  }
}

const userRepository = new UserRepository();

export default userRepository;
