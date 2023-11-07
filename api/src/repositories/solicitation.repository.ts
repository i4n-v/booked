import Solicitation from '../database/models/solicitation.model';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import SolicitationCreateDto from '../dto/solicitation/solicitationCreate.dto';
import SolicitationUpdateDto from '../dto/solicitation/solicitationUpdate.dto';
import { WhereOptions } from 'sequelize';
import SolicitationDto from '../dto/solicitation/solicitation.dto';

class SolicitationRepository {
  private repository: Repository<Solicitation>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Solicitation);
  }

  async findById(id: string) {
    return await this.repository.findByPk(id);
  }

  async create(solicitation: SolicitationCreateDto) {
    return await this.repository.create(solicitation);
  }

  async update(id: string, solicitation: SolicitationUpdateDto) {
    return await this.repository.update(solicitation, {
      where: {
        id,
      },
    });
  }

  async findAndCountAll(page: number, limit: number, options?: WhereOptions<SolicitationDto>) {
    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      where: options,
      attributes: ['id', 'status'],
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'user',
          attributes: ['id', 'name', 'user_name'],
        },
        {
          model: sequelizeConnection.model('Book'),
          as: 'book',
          attributes: ['id'],
          include: [
            {
              model: sequelizeConnection.model('User'),
              as: 'user',
              attributes: ['id', 'name', 'user_name'],
            },
          ],
        },
      ],
    });
  }

  async countPendingsByReceiverId(id: string) {
    return await this.repository.count({
      where: {
        status: 'pending',
      },
      include: {
        model: sequelizeConnection.model('Book'),
        as: 'book',
        where: {
          user_id: id,
        },
      },
    });
  }
}

export default new SolicitationRepository();
