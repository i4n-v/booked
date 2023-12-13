import { NextFunction, Request, Response } from 'express';
import messages from '../config/messages.config';
import userRepository from '../repositories/user.repository';
import followerRepository from '../repositories/follower.repository';

class FollowerController {
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params } = request;

      const followedId = params.id;

      const userFollowed = await userRepository.findById(followedId);

      if (!userFollowed) {
        return response.status(404).json({ message: messages.unknown('Usuário') });
      }

      if (auth.id === userFollowed.id) {
        return response.status(400).json({ message: 'Você não pode seguir a si mesmo.' });
      }

      const existingFollower = await followerRepository.findByUserAndFollowed(
        auth.id,
        userFollowed.id
      );

      if (existingFollower) {
        return response.status(400).json({ message: 'Você já está seguindo esse usuário.' });
      }

      await followerRepository.create({
        follower_id: auth.id,
        followed_id: userFollowed.id,
      });

      return response.json({ message: messages.create('Seguidor') });
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params } = request;
      const followedId = params.id;

      const followed = await followerRepository.findById(followedId);

      console.log('followed', followed);

      if (!followed) {
        return response.status(404).json({ message: messages.unknown('Usuário') });
      }

      if (followed.follower_id !== auth.id) {
        return response.status(401).json({ message: messages.unauthorized() });
      }

      await followerRepository.deleteById(followed.id);

      return response.json({ message: 'Usuário deixado de seguir com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}

export default new FollowerController();
