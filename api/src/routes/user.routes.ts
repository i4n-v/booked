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
 *                 email: ana@email.com
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

/**
 * @openapi
 * /users/{id}/password:
 *   patch:
 *     summary: Update password
 *     description: This route update the user password.
 *     tags:
 *       - Users
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The id of user
 *         in: path
 *         schema:
 *           type: string;
 *     security:
 *       - access_token: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               previous_password:
 *                 type: string
 *               password:
 *                 type: string
 *               comfirm_password:
 *                 type: string*
 *           examples:
 *             send_payload:
 *               value:
 *                 previous_password: '12345678'
 *                 password: '87654321'
 *                 confirm_password: '87654321'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.patch('/users/:id/password', UserController.changePassword);

export default router;
