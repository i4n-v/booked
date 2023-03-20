import Acquisition from '../database/models/acquisition.model';
import UserCreateDto from '../dto/acquisition/acquisitionCreate.dto';

class AcquisitionRepository {
  async create(acquisition: UserCreateDto) {
    const createdAcquisition = await Acquisition.create(acquisition);
    return createdAcquisition;
  }
}

const acquisitionRepository = new AcquisitionRepository();

export default acquisitionRepository;
