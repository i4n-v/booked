import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({
    system: 'booked',
    message: 'hello world',
  });
});

export default routes;
