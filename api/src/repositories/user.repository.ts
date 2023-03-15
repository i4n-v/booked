import User from '../database/models/user.model';
import UserCreateDto from '../dto/user/userCreate.dto';
import { Op } from 'sequelize';

class UserRepository {
  async create(user: UserCreateDto) {
    const createdUser = await User.create(user);
    return createdUser;
  }

  async countByUserName(name: string) {
    const countUsers = await User.count({
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
