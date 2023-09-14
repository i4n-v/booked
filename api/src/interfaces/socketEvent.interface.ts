import { Socket } from 'socket.io';

export type SocketEventlistener = (socket: Socket, ...args: any[]) => void;

export interface ISocketEvent {
  name: string;
  listener: SocketEventlistener;
}
