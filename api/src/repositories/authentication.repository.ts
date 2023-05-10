import Authentication from '../database/models/authentication.model';
import AuthenticationCreateDto from '../dto/authentication/authenticationCreate.dto';
import AuthenticationUpdateDto from '../dto/authentication/authenticationUpdate.dto';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';

class AuthenticationRepository {
  private repository: Repository<Authentication>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Authentication);
  }

  async create(authentication: AuthenticationCreateDto) {
    return await this.repository.create(authentication);
  }

  async findByToken(token: string) {
    return await this.repository.findOne({
      where: {
        token,
      },
    });
  }

  async updateByToken(token: string, data: AuthenticationUpdateDto) {
    return await this.repository.update(data, {
      where: {
        token,
      },
    });
  }

  async updateByUserId(userId: string, data: AuthenticationUpdateDto) {
    return await this.repository.update(data, {
      where: {
        user_id: userId,
      },
    });
  }

  async findByUserId(userId: string) {
    return await this.repository.findOne({
      where: {
        user_id: userId,
        valid: true,
      },
    });
  }
}

export default new AuthenticationRepository();
