import { NextFunction, Request, Response } from 'express';
import messages from '../config/messages.config';
import userRepository from '../repositories/user.repository';
import followerRepository from '../repositories/follower.repository';

class FollowerController {
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params } = request;

      const followedId = params.id;

      const followed = await userRepository.findById(followedId);

      if (!followed) {
        return response.status(404).json({ message: messages.unknown('Usuário') });
      }

      if (auth.id === followed.id) {
        return response.status(400).json({ message: 'Você não pode seguir a si mesmo.' });
      }

      const existingFollower = await followerRepository.findByUserAndFollowed(auth.id, followed.id);

      if (existingFollower) {
        return response.status(400).json({ message: 'Você já está seguindo esse usuário.' });
      }

      await followerRepository.create({
        user_id: auth.id,
        followed_id: followed.id,
      });

      return response.json({ message: messages.create('Seguidor') });
    } catch (error) {
      next(error);
    }
  }
}

export default new FollowerController();
