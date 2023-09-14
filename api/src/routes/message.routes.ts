import router from '../config/router.config';
import MessageController from '../controllers/message.controller';
import authMidleware from '../midlewares/auth.midleware';

/**
 * @openapi
 * /messages:
 *   post:
 *     summary: Create a message.
 *     description: This route create a message to a chat.
 *     tags:
 *       - Message
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
 *               receiver_id:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - receiver_id
 *               - content
 *           examples:
 *             create_message:
 *               value:
 *                 receiver_id: 'a98fb524-bfea-4dc1-a8f0-66410097263a'
 *                 content: 'Olá, tudo bem?'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.post('/messages', authMidleware, MessageController.store);

/**
 * @openapi
 * /messages/{id}:
 *   delete:
 *     summary: Delete a message.
 *     description: This route delete a message from a chat.
 *     tags:
 *       - Message
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The id of message
 *         in: path
 *         schema:
 *           type: string;
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.delete('/messages/:id', authMidleware, MessageController.delete);

export default router;
