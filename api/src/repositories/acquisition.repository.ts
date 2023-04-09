import Acquisition from '../database/models/acquisition.model';
import AcquisitionCreateDto from '../dto/acquisition/acquisitionCreate.dto';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
class AcquisitionRepository {
  private repository: Repository<Acquisition>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Acquisition);
  }

  async create(acquisition: AcquisitionCreateDto) {
    return await this.repository.create(acquisition);
  }
}

export default new AcquisitionRepository();
