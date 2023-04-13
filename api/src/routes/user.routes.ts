import router from '../config/router.config';
import UserController from '../controllers/user.controller';

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a user.
 *     description: This route create a user if not exists.
 *     tags:
 *       - Users
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *     security:
 *       - access_token: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *           examples:
 *             send_payload:
 *               value:
 *                 name: Ana Carollina
 *                 birth_date: 2003-07-14
 *                 password: '12345678'
 *                 confirm_password: '12345678'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 */
router.post('/users', UserController.store);

export default router;
