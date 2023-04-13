import router from '../config/router.config';

/**
 * @openapi
 * /:
 *   get:
 *     summary: Hello world.
 *     description: This is the root route.
 *     tags:
 *       - App
 *     responses:
 *       200:
 *         description: Return the hello world object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 system: string
 *                 message: string
 *             examples:
 *               response_paylod:
 *                 value:
 *                   system: booked
 *                   message: Hello world.
 */
router.get('/', (request, response) => {
  response.json({
    system: 'booked',
    message: 'Hello world',
  });
});

export default router;
