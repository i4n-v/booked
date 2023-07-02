import Acquisition from '../database/models/acquisition.model';
import AcquisitionCreateDto from '../dto/acquisition/acquisitionCreate.dto';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import AcquisitionUpdateDto from '../dto/acquisition/acquisitionUpdate.dto';
class AcquisitionRepository {
  private repository: Repository<Acquisition>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Acquisition);
  }

  async findById(id: string) {
    return await this.repository.findByPk(id);
  }

  async create(acquisition: AcquisitionCreateDto) {
    return await this.repository.create(acquisition);
  }

  async update(id: string, acquisition: AcquisitionUpdateDto) {
    return await this.repository.update(acquisition, {
      where: {
        id,
      },
    });
  }
}

export default new AcquisitionRepository();
