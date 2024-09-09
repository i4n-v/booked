import router from '../config/router.config';
import ChatController from '../controllers/chat.controller';
import MessageController from '../controllers/message.controller';
import authMidleware from '../midlewares/auth.midleware';

/**
 * @openapi
 * /chats:
 *   get:
 *     summary: List chats.
 *     description: This route list chats with pagination.
 *     tags:
 *       - Chat
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - $ref: '#/components/parameters/access_token'
 *       - name: name
 *         description: Name of chat
 *         in: query
 *         schema:
 *           type: string
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         description: Return the chat data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               id:
 *                 type: string
 *               users:
 *                  type: array
 *               not_readed_messages:
 *                 type: integer
 *               messages:
 *                  type: array
 *             examples:
 *               get_payload:
 *                 value:
 *                   id: 'a99fb524-bfea-4dc1-a8f0-66410097266b'
 *                   users:
 *                     - id: '449e0bd0-3b89-495c-b311-57acec53f702'
 *                       name: 'Maria Eduarda'
 *                       user_name: 'maria#0'
 *                       photo_url: 'http://localhost:5000/public/uploads/images/1f96b637e1b9b174ffc4d3030e87b71c-example-image.png'
 *                     - id: 'badd7b31-53af-4936-8044-95ead27d783e'
 *                       name: 'João Gabriel'
 *                       user_name: 'joão#0'
 *                       photo_url: 'http://localhost:5000/public/uploads/images/1f96b637e1b9b174ffc4d3030e87b71c-example-image.png'
 *                   unreaded_messages: 8
 *                   messages:
 *                     - id: 'a01835c6-0db7-4bd0-b1df-402c5b71bdf8'
 *                       sender_id: '449e0bd0-3b89-495c-b311-57acec53f702'
 *                       content: 'Olá, tudo bem?'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.get('/chats', authMidleware, ChatController.index);

router.get('/chats/:id', authMidleware, ChatController.show);

/**
 * @openapi
 * /chats/{id}/messages:
 *   get:
 *     summary: List messages.
 *     description: This route list messages with pagination.
 *     tags:
 *       - Chat
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: Id of chat
 *         in: path
 *         schema:
 *           type: string
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         description: Return the message data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               id:
 *                 type: string
 *               read:
 *                  type: boolean
 *               content:
 *                  type: string
 *               chat_id:
 *                 type: string
 *               sender:
 *                  type: object
 *               books:
 *                  type: array
 *             examples:
 *               get_payload:
 *                 value:
 *                   id: 'a99fb524-bfea-4dc1-a8f0-66410097266b'
 *                   read: false
 *                   content: 'Olá, tudo bem?'
 *                   chat_id: 'a8ff7455-dc4a-425d-87d2-2088465748d4'
 *                   sender:
 *                     id: '449e0bd0-3b89-495c-b311-57acec53f702'
 *                     name: 'Maria Eduarda'
 *                     user_name: 'maria#0'
 *                     photo_url: 'http://localhost:5000/public/uploads/images/1f96b637e1b9b174ffc4d3030e87b71c-example-image.png'
 *                     books:
 *                       - id: '449e0bd0-3b89-495c-b311-57acec53f702'
 *                         name: 'Mundo mágico'
 *                         description: 'Um grande mundo mágico.'
 *                         price: 12.56
 *                         free_pages: 10
 *                         photo_url: 'http://localhost:5000/public/uploads/images/1f96b637e1b9b174ffc4d3030e87b71c-example-image.png'
 *                         user_id: 'a99fb524-6fea-4dc1-a8f0-66410097266b'
 *                         createdAt: '2023-05-15T01:48:16.006Z'
 *                         updatedAt: '2023-05-15T01:48:16.006Z'
 *                         rating: 0
 *                         total_users_rating: 0
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.get('/chats/:id/messages', authMidleware, MessageController.index);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a chat.
 *     description: This route create a chat if not exists.
 *     tags:
 *       - Chat
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
 *               users:
 *                 type: array
 *           examples:
 *             send_payload:
 *               value:
 *                 name: 'Vendas e divulgações'
 *                 users:
 *                   - 34dd53ba-d45d-4721-a15c-497e41f0c280
 *                   - f4f7c237-e14d-4f27-8e2d-cacc16497db1
 *                   - 67eb0237-fd66-4ebe-8840-539b5cbc5f49
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.post('/chats', authMidleware, ChatController.store);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Update a chat.
 *     description: This route update a chat if not exists.
 *     tags:
 *       - Chat
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
 *               users:
 *                 type: array
 *           examples:
 *             send_payload:
 *               value:
 *                 name: 'Vendas e divulgações'
 *                 users:
 *                   - 34dd53ba-d45d-4721-a15c-497e41f0c280
 *                   - f4f7c237-e14d-4f27-8e2d-cacc16497db1
 *                   - 67eb0237-fd66-4ebe-8840-539b5cbc5f49
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.put('/chats/:id', authMidleware, ChatController.update);

export default router;
