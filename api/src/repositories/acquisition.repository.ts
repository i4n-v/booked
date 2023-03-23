import Acquisition from '../database/models/acquisition.model';
import AcquisitionCreateDTO from '../dto/acquisition/acquisitionCreate.dto';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
class AcquisitionRepository {
  private repository: Repository<Acquisition>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Acquisition);
  }

  async create(acquisition: AcquisitionCreateDTO) {
    const createdAcquisition = await this.repository.create(acquisition);
    return createdAcquisition;
  }
}

const acquisitionRepository = new AcquisitionRepository();

export default acquisitionRepository;
