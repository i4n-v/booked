import { NextFunction, Request, Response } from 'express';
import paginationWrapper from '../utils/paginationWrapper';
import MessageRepository from '../repositories/message.repository';
import ChatRepository from '../repositories/chat.repository';
import messages from '../config/messages.config';
import MessageCreateDto from '../dto/message/messageCreate.dto';
import { io } from '../setup';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { fileSystem } from '../utils';
import UserChatRepository from '../repositories/userChat.repository';

interface ICreateMessageBody extends MessageCreateDto {
  receiver_id: string;
}

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

      const userIsNotInChat = chat.users.every(({ id }) => id !== auth.id);

      if (userIsNotInChat) {
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
      const { content, receiver_id, chat_id }: ICreateMessageBody = body;
      let photo_url: string | null = null;

      if (!content && !file) {
        return response
          .status(400)
          .json({ message: 'Um conteúdo ou imagem da mensagem deve ser informado.' });
      }

      if (file) {
        photo_url = fileSystem.filePathToUpload(file.path);
      }

      let chat = await ChatRepository.findById(chat_id);

      if (chat) {
        const userIsNotInChat = chat.users.every(({ id }) => id !== auth.id);
        if (userIsNotInChat) return response.status(401).json({ message: messages.unauthorized() });
      }

      await sequelizeConnection.transaction(async (transaction) => {
        if (!chat) {
          if (!receiver_id) {
            return response.status(400).json({
              message: 'Para uma nova conversa, é necessário informar quem irá receber a mensagem.',
            });
          }

          chat = await ChatRepository.create({}, transaction);
          await UserChatRepository.create({ chat_id: chat.id, user_id: auth.id }, transaction);
          await UserChatRepository.create({ chat_id: chat.id, user_id: receiver_id }, transaction);
          chat = await ChatRepository.findById(chat.id, transaction);
        }

        if (chat) {
          const createdMessage = await MessageRepository.create(
            {
              chat_id: chat.id,
              sender_id: auth.id,
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

          for (const user of chat.users) {
            if (user.id === auth.id) {
              const senderChatWithLastMessage = await ChatRepository.findByIdWithUsers(
                chat.id,
                auth.id,
                request,
                transaction
              );

              io.emit(`receive-chat-${auth.id}`, senderChatWithLastMessage);
            } else {
              const unreadedChats = await ChatRepository.countUnreadedByReceiverId(
                user.id,
                transaction
              );

              const receiveChatWithLastMessage = await ChatRepository.findByIdWithUsers(
                chat.id,
                receiver_id,
                request,
                transaction
              );

              io.emit(`pending-chats-${user.id}`, unreadedChats);
              io.emit(`receive-chat-${user.id}`, receiveChatWithLastMessage);
            }

            io.emit(`receive-message-${chat.id}`, message);
          }

          return response.json({ message: messages.create('Mensagem'), chat_id: chat.id });
        }
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

      io.emit(`deleted-message-${message.chat_id}`, message.id);

      return response.json({ message: messages.delete('Mensagem') });
    } catch (error) {
      next(error);
    }
  }
}

export default new MessageController();
