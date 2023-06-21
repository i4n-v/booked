import router from '../config/router.config';
import UserController from '../controllers/user.controller';
import authMidleware from '../midlewares/auth.midleware';
import uploadMidleware from '../midlewares/upload.midleware';

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a user.
 *     description: This route create a user if not exists.
 *     tags:
 *       - User
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
 * /users/{id}:
 *   get:
 *     summary: get a user data.
 *     description: This route return a specific user data by your id.
 *     tags:
 *       - User
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
 *     responses:
 *       200:
 *         description: Return the user data except credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               name:
 *                 type: string
 *               user_name:
 *                  ype: string
 *               email:
 *                  ype: string
 *               birth_date:
 *                  ype: string
 *               description:
 *                 type: string
 *               photo_url:
 *                 type: string;
 *               createdAt:
 *                 type: string;
 *               total_books:
 *                 type: integer;
 *               total_acquisitions:
 *                 type: integer;
 *             examples:
 *               get_payload:
 *                 value:
 *                   name: Ana Carollina
 *                   user_name: ana#0
 *                   email: ana@email.com
 *                   birth_date: '2003-07-14'
 *                   description: 'I am a big author!'
 *                   photo_url: 'http://localhost:5000/public/uploads/images/5bbd9d133d18170ac1db1d633546f2c6-profile.png'
 *                   createdAt: '2010-03-23'
 *                   total_books: 20
 *                   total_acquisitions: 5
 *
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.get('/users/:id', authMidleware, UserController.show);

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Update user data.
 *     description: This route update the user data.
 *     tags:
 *       - User
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               user_name:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               description:
 *                 type: string
 *               photo:
 *                 $ref: '#/components/schemas/Image'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.patch('/users/:id', authMidleware, uploadMidleware.single('photo'), UserController.update);

/**
 * @openapi
 * /users/{id}/password:
 *   patch:
 *     summary: Update password
 *     description: This route update the user password.
 *     tags:
 *       - User
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
 *       401:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.patch('/users/:id/password', authMidleware, UserController.changePassword);

export default router;
