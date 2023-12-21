import { NextFunction, Request, Response } from 'express';
import messages from '../config/messages.config';
import UserRepository from '../repositories/user.repository';
import followerRepository from '../repositories/follower.repository';

class FollowerController {
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params } = request;

      const followedId = params.id;

      const userFollowed = await UserRepository.findById(followedId, null);

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

      return response.json({ message: 'Você está seguindo este usuário' });
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params } = request;
      const followedId = params.id;

      const userFollowed = await UserRepository.findById(followedId, null);

      if (!userFollowed) {
        return response.status(404).json({ message: messages.unknown('Usuário') });
      }

      if (auth.id === userFollowed.id) {
        return response.status(400).json({ message: 'Você não pode deixar de seguir a si mesmo.' });
      }

      const existingFollower = await followerRepository.findByUserAndFollowed(
        auth.id,
        userFollowed.id
      );

      if (!existingFollower) {
        return response.status(400).json({ message: 'Você não segue este usuário.' });
      }

      await followerRepository.deleteById(existingFollower.id);

      return response.json({ message: 'Você deixou de seguir este usuário.' });
    } catch (error) {
      next(error);
    }
  }
}

export default new FollowerController();
