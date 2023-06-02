import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Comment from '../database/models/comment.model';
import CommentCreateDto from '../dto/comment/commentCreate.dto';
import CommentUpdateDto from '../dto/comment/commentUpdate.dto';
import { WhereOptions } from 'sequelize';

class CommentRepository {
  private repository: Repository<Comment>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Comment);
  }

  async create(comment: CommentCreateDto) {
    return await this.repository.create(comment);
  }

  async update(id: string, comment: CommentUpdateDto) {
    return await this.repository.update(comment, {
      where: {
        id,
      },
    });
  }

  async findById(id: string) {
    return await this.repository.findByPk(id);
  }

  async deleteById(id: string) {
    return await this.repository.destroy({
      where: {
        id,
      },
    });
  }

  async findAndCountAll(page: number, limit: number, options?: WhereOptions<Comment>) {
    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'ASC']],
      where: options,
    });
  }
}

export default new CommentRepository();
