import { ISocketEvent } from '../interfaces/socketEvent.interface';
import { io } from '../setup';
import chatEvents from './chat.events';
import userEvents from './user.events';

const events: ISocketEvent[] = [...userEvents, ...chatEvents];

export default function initSocketEvents() {
  io.on('connection', async (socket) => {
    events.forEach(({ name, listener }) => {
      if (name === 'connection') {
        listener(socket);
      } else {
        socket.on(name, (...args) => {
          listener(socket, ...args);
        });
      }
    });
  });
}
