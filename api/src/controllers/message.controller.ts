import { NextFunction, Request, Response } from 'express';
import paginationWrapper from '../utils/paginationWrapper';
import MessageRepository from '../repositories/message.repository';
import ChatRepository from '../repositories/chat.repository';
import messages from '../config/messages.config';
import MessageCreateDto from '../dto/message/messageCreate.dto';
import UserRepository from '../repositories/user.repository';
import { io } from '../setup';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { fileSystem } from '../utils';

class MessageController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        query,
        params: { id },
        auth,
      } = request;
      const page = query.page ? parseInt(query.page as unknown as string) : 1;
      const limit = query.limit ? parseInt(query.limit as unknown as string) : 75;
      const whereStatement: any = {
        chat_id: id,
      };

      const chat = await ChatRepository.findById(id);

      if (!chat) return response.status(404).json({ message: messages.unknown('Conversa') });

      if (chat.first_user_id !== auth.id && chat.second_user_id !== auth.id) {
        return response.status(401).json({ message: messages.unauthorized() });
      }

      const chatMessages = await MessageRepository.findAndCountAll(
        page,
        limit,
        request,
        whereStatement
      );

      const wrappedMessages = paginationWrapper(chatMessages, page, limit);

      return response.json(wrappedMessages);
    } catch (error) {
      next(error);
    }
  }

  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { body, auth, file } = request;
      const { receiver_id, content }: MessageCreateDto = body;
      let photo_url: string | null = null;

      if (receiver_id === auth.id) {
        if (file) await fileSystem.removeFile(file.path);

        return response
          .status(400)
          .json({ message: 'Não é possível enviar uma mensagem para o mesmo usuário.' });
      }

      if (!content || !file) {
        return response
          .status(400)
          .json({ message: 'Um conteúdo ou imagem da mensagem deve ser informado.' });
      }

      if (file) {
        photo_url = fileSystem.filePathToUpload(file.path);
      }

      const receiver = await UserRepository.findById(receiver_id);

      if (!receiver) {
        if (file) await fileSystem.removeFile(file.path);

        return response.status(400).json({ message: messages.unknown('Usuário') });
      }

      let chat = await ChatRepository.findByUsers(auth.id, receiver_id);

      await sequelizeConnection.transaction(async (transaction) => {
        if (!chat) {
          chat = await ChatRepository.create(
            {
              first_user_id: auth.id,
              second_user_id: receiver_id,
            },
            transaction
          );
        }

        const createdMessage = await MessageRepository.create(
          {
            chat_id: chat.id,
            sender_id: auth.id,
            receiver_id,
            content,
            photo_url,
          },
          transaction
        );

        const message = await MessageRepository.findByIdWithUsers(
          createdMessage.id,
          request,
          transaction
        );
        const senderChatWithLastMessage = await ChatRepository.findByIdWithUsers(
          chat.id,
          auth.id,
          request,
          transaction
        );
        const receiverChatWithLastMessage = await ChatRepository.findByIdWithUsers(
          chat.id,
          receiver_id,
          request,
          transaction
        );
        const unreadedChats = await ChatRepository.countUnreadedByReceiverId(
          receiver_id,
          transaction
        );

        io.emit(`receive-chat-${receiver_id}`, receiverChatWithLastMessage);
        io.emit(`receive-chat-${auth.id}`, senderChatWithLastMessage);
        io.emit(`pending-chats-${receiver_id}`, unreadedChats);
        io.emit(`receive-message-${chat.id}-${receiver_id}`, message);

        return response.json({ message: messages.create('Mensagem'), chat_id: chat.id });
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params } = request;

      const message = await MessageRepository.findById(params.id);

      if (message?.sender_id !== auth.id) {
        return response.status(401).json({ message: messages.unauthorized() });
      }

      await MessageRepository.deleteById(params.id);

      io.emit(`deleted-message-${message.chat_id}-${message.receiver_id}`, message.id);

      return response.json({ message: messages.delete('Mensagem') });
    } catch (error) {
      next(error);
    }
  }
}

export default new MessageController();
