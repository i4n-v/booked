import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Assessment from '../database/models/assessment.model';
import AssessmentCreateDto from '../dto/assessment/assessmentCreate.dto';
import AssessmentUpdateDto from '../dto/assessment/assessmentUpdate.dto';

class AssessmentRepository {
  private repository: Repository<Assessment>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Assessment);
  }

  async findById(id: string) {
    return await this.repository.findByPk(id);
  }

  async create(assessement: AssessmentCreateDto) {
    return await this.repository.create(assessement);
  }

  async update(id: string, assessement: AssessmentUpdateDto) {
    return await this.repository.update(assessement, {
      where: {
        id,
      },
    });
  }
}

export default new AssessmentRepository();
