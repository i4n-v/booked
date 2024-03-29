/* import Acquisition from '../database/models/acquisition.model';
import AcquisitionCreateDto from '../dto/acquisition/acquisitionCreate.dto';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import AcquisitionUpdateDto from '../dto/acquisition/acquisitionUpdate.dto'; */

import { Repository } from 'sequelize-typescript';
import Wishe from '../database/models/wishe.model';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import WisheCreateDto from '../dto/wishe/wisheCreate.dto';

class WisheRepository {
  private repository: Repository<Wishe>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Wishe);
  }

  async findById(id: string) {
    return await this.repository.findByPk(id);
  }

  async findByBookId(id: string) {
    return await this.repository.findOne({
      where: {
        book_id: id,
      },
    });
  }

  async create(whise: WisheCreateDto) {
    return await this.repository.create(whise);
  }

  async deleteById(id: string) {
    return await this.repository.destroy({
      where: {
        id,
      },
    });
  }
}

export default new WisheRepository();
