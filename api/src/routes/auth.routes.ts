import router from '../config/router.config';
import AuthenticationController from '../controllers/authentication.controller';
import authMidleware from '../midlewares/auth.midleware';

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login.
 *     description: This route checks and authenticates the user if his credentials are valid.
 *     tags:
 *       - Login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               password:
 *                 type: string
 *           examples:
 *             send_payload:
 *               value:
 *                 user_name: user#0
 *                 password: '12345678'
 *     responses:
 *       200:
 *         description: Return the user data and your authentication token.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  user_name:
 *                    type: string
 *                  email:
 *                    type: string
 *                  token:
 *                    type: string
 *             examples:
 *               response_payload:
 *                 value:
 *                   id: b4a37abf-9d14-4e95-bb80-01b5e93e8260
 *                   user_name: user#0
 *                   email: ian@email.com
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.                   eyJpZCI6ImI0YTM3YWJmLTlkMTQtNGU5NS1iYjgwLTAxYjVlOTNlODI2MCIsInVzZXJfbmFtZSI6ImlhbiMwIiwiZW1haWwiOiJpYW5AZW1haWwuY29tIiwiaWF0IjoxNjgxMTMzMTQ3LCJleHAiOjE2ODEyMTk1NDd9.kF41zvlrnI57KCUmg4zkNG2YUcrQHz7O-YLcskWmaZI
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.post('/login', AuthenticationController.authenticate);

/**
 * @openapi
 * /login/verify:
 *   get:
 *     summary: Verify token.
 *     description: This route checks and returns the validity of the access token.
 *     tags:
 *       - Login
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         description: Return the validity of the access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *                 valid: boolean
 *             examples:
 *               response_paylod:
 *                 value:
 *                   message: Token válido.
 *                   valid: true
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.get('/login/verify', authMidleware, AuthenticationController.verify);

export default router;
