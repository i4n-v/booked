import { Repository } from 'sequelize-typescript';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import Follower from '../database/models/follower.model';
import FollowerCreateDto from '../dto/follower/followerCreate.dto';

class FollowerRepository {
  private repository: Repository<Follower>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Follower);
  }

  async findById(id: string) {
    return await this.repository.findByPk(id);
  }

  async create(follower: FollowerCreateDto) {
    return await this.repository.create(follower);
  }

  async findByUserAndFollowed(user_id: string, followed_id: string) {
    return await this.repository.findOne({
      where: {
        user_id,
        followed_id,
      },
    });
  }

  async deleteById(id: string) {
    return await this.repository.destroy({
      where: {
        id,
      },
    });
  }
}

export default new FollowerRepository();
