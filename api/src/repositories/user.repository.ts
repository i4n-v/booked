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
      const countUsers = await this.countByName(firstName);
      user.user_name = `${firstName}#${countUsers}`;
    }

    return await this.repository.create(user);
  }

  async countByName(name: string) {
    return await this.repository.count({
      where: {
        user_name: {
          [Op.like]: `${name}%`,
        },
      },
    });
  }

  async findByCredentials(userName: string, email: string) {
    return await this.repository.findOne({
      where: {
        [Op.or]: [{ user_name: userName }, { email }],
      },
    });
  }
}

export default new UserRepository();
