import router from '../config/router.config';
import WisheController from '../controllers/wishe.controller';
import authMidleware from '../midlewares/auth.midleware';

/**
/**
 * @openapi
 * /wishe/books:
 *   get:
 *     summary: List wishes books.
 *     description: This route list wishes books with pagination.
 *     tags:
 *       - Wishe
 *     parameters:
 *       - $ref: '#/components/parameters/access_token'
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - name: search
 *         description: Is the name of book or name of author
 *         in: query
 *         schema:
 *           type: string
 *       - name: min_date
 *         description: Min date of published books
 *         in: query
 *         schema:
 *           type: string
 *       - name: max_date
 *         description: Max date of published books
 *         in: query
 *         schema:
 *           type: string
 *       - name: free
 *         description: Free published books
 *         in: query
 *         schema:
 *           type: boolean
 *       - name: min_price
 *         description: Min price of published books
 *         in: query
 *         schema:
 *           type: float
 *       - name: max_price
 *         description: Max price of published books
 *         in: query
 *         schema:
 *           type: float
 *       - name: categories
 *         description: A array of category ids
 *         in: query
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         description: Return the list of wishes books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               id: string
 *               name: string
 *               description: string
 *               price: float
 *               photo_url: string
 *               user_id: string
 *               createdAt: string
 *               updatedAt: string
 *               rating: float
 *               wished: boolean
 *               total_users_rating: integer
 *               categories: array
 *             examples:
 *               get_payload:
 *                 value:
 *                   - id: 'ebd486ce-8dbd-4e13-bf46-e03c3fa5f3dc'
 *                     name: 'Mundo mágico'
 *                     description: 'Um grande mundo mágico.'
 *                     price: 12.56
 *                     photo_url: 'http://localhost:5000/public/uploads/images/1f96b637e1b9b174ffc4d3030e87b71c-example-image.png'
 *                     user_id:
 *                         id: 'a99fb524-6fea-4dc1-a8f0-66410097266b'
 *                         name: 'amanda'
 *                         user_name: 'amanda#0'
 *                     createdAt: '2023-05-15T01:48:16.006Z'
 *                     updatedAt: '2023-05-15T01:48:16.006Z'
 *                     rating: 0
 *                     total_users_rating: 0
 *                     wished: true
 *                     categories:
 *                       - id: 'a99fb524-bfea-4dc1-a8f0-66410097266b'
 *                         name: 'Ação'
 *                       - id: 'a29fb524-6fea-4dc1-a8f0-66410097266b'
 *                         name: 'Aventura'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.get('/wishe/books', authMidleware, WisheController.index);

/**
 * @openapi
 * /wishe/books/{id}:
 *   post:
 *     summary: Create a wishe.
 *     description: This route create a book's wishe to a user.
 *     tags:
 *       - Wishe
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The id of book to wishe
 *         in: path
 *         schema:
 *           type: string;
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.post('/wishe/books/:id', authMidleware, WisheController.store);

/**
 * @openapi
 * /wishe/books/{id}:
 *   delete:
 *     summary: Delete a specific wishe of book.
 *     description: This route delete a wishe if exists.
 *     tags:
 *       - Wishe
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The id of wished book
 *         in: path
 *         schema:
 *           type: string;
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         $ref: '#components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.delete('/wishe/books/:id', authMidleware, WisheController.delete);

export default router;
