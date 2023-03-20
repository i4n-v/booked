import router from '../config/router.config';

router.get('/', (request, response) => {
  response.json({
    system: 'booked',
    message: 'Hello world',
  });
});

export default router;
