import 'dotenv/config';
import express from 'express';
import errorHandlerMidleWare from './midlewares/errorHandler.midleware';
import routes from './routes/';
import swagger from './config/swagger.config';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/public', express.static('public'));
swagger(app);
routes(app);
app.use(errorHandlerMidleWare);
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

export { io, httpServer };
