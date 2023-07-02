import router from '../config/router.config';
import BookController from '../controllers/book.controller';
import authMidleware from '../midlewares/auth.midleware';
import optionalAuthMidleware from '../midlewares/optionalAuth.midlware';
import uploadMidleware from '../midlewares/upload.midleware';

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a book.
 *     description: This route create a book if not exists.
 *     tags:
 *       - Book
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *     security:
 *       - access_token: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: float
 *               free_pages:
 *                 type: integer
 *               description:
 *                 type: string
 *               photo:
 *                 $ref: '#/components/schemas/Image'
 *               file:
 *                 $ref: '#/components/schemas/File'
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *           encoding:
 *             categories:
 *               style: form
 *               explode: true
 *           examples:
 *             send_payload:
 *               value:
 *                 user_id: 'a99fb524-bfea-4dc1-a8f0-66410097266b'
 *                 name: 'Mundo mágico'
 *                 price: 32.50
 *                 free_pages: 10
 *                 description: 'Um livro cheio de aventuras'
 *                 photo: 'Arquivo da foto'
 *                 file: 'Arquivo do livro'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.post(
  '/books',
  authMidleware,
  uploadMidleware.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  BookController.store
);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a specific book.
 *     description: This route update a book if exists.
 *     tags:
 *       - Book
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The id of book
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
 *               price:
 *                 type: float
 *               free_pages:
 *                 type: integer
 *               description:
 *                 type: string
 *               photo:
 *                 $ref: '#/components/schemas/Image'
 *               file:
 *                 $ref: '#/components/schemas/File'
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *           encoding:
 *             categories:
 *               style: form
 *               explode: true
 *           examples:
 *             send_payload:
 *               value:
 *                 name: 'Mundo mágico'
 *                 price: 32.50
 *                 free_pages: 10
 *                 description: 'Um livro cheio de aventuras'
 *                 photo: 'Arquivo da foto'
 *                 file: 'Arquivo do livro'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.put(
  '/books/:id',
  authMidleware,
  uploadMidleware.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  BookController.update
);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Show a books.
 *     description: This route show a book.
 *     tags:
 *       - Book
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The id of book
 *         in: path
 *         schema:
 *           type: string;
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         description: Return a book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               id: string
 *               name: string
 *               description: string
 *               price: float
 *               free_pages: integer
 *               photo_url: string
 *               file_url: string
 *               user_id: string
 *               createdAt: string
 *               updatedAt: string
 *               rating: float
 *               total_users_rating: integer
 *               categories: array
 *               user_raters: array
 *             examples:
 *               get_payload:
 *                 value:
 *                   id: 'ebd486ce-8dbd-4e13-bf46-e03c3fa5f3dc'
 *                   name: 'Mundo mágico'
 *                   description: 'Um grande mundo mágico.'
 *                   price: 12.56
 *                   free_pages: 10
 *                   photo_url: 'http://localhost:5000/public/uploads/images/1f96b637e1b9b174ffc4d3030e87b71c-example-image.png'
 *                   file_url: 'http://localhost:5000/public/uploads/files/1f96b637e1b9b174ffc4d3030e87b71c-example-file.pdf'
 *                   user_id: 'a99fb524-6fea-4dc1-a8f0-66410097266b'
 *                   createdAt: '2023-05-15T01:48:16.006Z'
 *                   updatedAt: '2023-05-15T01:48:16.006Z'
 *                   rating: 0
 *                   total_users_rating: 0
 *                   categories:
 *                     - id: 'a99fb524-bfea-4dc1-a8f0-66410097266b'
 *                       name: 'Ação'
 *                     - id: 'a29fb524-6fea-4dc1-a8f0-66410097266b'
 *                       name: 'Aventura'
 *                   user_raters:
 *                     - id: 'a99fb524-bfea-4dc1-bfea-66410097266b'
 *                       assessment:
 *                         id: 'a99fb524-bfea-4dc1-4dc1-66410097266b'
 *                         number: 3
 *
 *
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.get('/books/:id', optionalAuthMidleware, BookController.show);

/**
 * @openapi
 * /books:
 *   get:
 *     summary: List books.
 *     description: This route list books with pagination.
 *     tags:
 *       - Book
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - name: search
 *         description: Is the name of book or name of author
 *         in: query
 *         schema:
 *           type: string
 *       - name: user_id
 *         description: Is the id of author
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
 *     responses:
 *       200:
 *         description: Return the list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               id: string
 *               name: string
 *               description: string
 *               price: float
 *               free_pages: integer
 *               photo_url: string
 *               user_id: string
 *               createdAt: string
 *               updatedAt: string
 *               rating: float
 *               total_users_rating: integer
 *               categories: array
 *             examples:
 *               get_payload:
 *                 value:
 *                   - id: 'ebd486ce-8dbd-4e13-bf46-e03c3fa5f3dc'
 *                     name: 'Mundo mágico'
 *                     description: 'Um grande mundo mágico.'
 *                     price: 12.56
 *                     free_pages: 10
 *                     photo_url: 'http://localhost:5000/public/uploads/images/1f96b637e1b9b174ffc4d3030e87b71c-example-image.png'
 *                     user_id: 'a99fb524-6fea-4dc1-a8f0-66410097266b'
 *                     createdAt: '2023-05-15T01:48:16.006Z'
 *                     updatedAt: '2023-05-15T01:48:16.006Z'
 *                     rating: 0
 *                     total_users_rating: 0
 *                     categories:
 *                       - id: 'a99fb524-bfea-4dc1-a8f0-66410097266b'
 *                         name: 'Ação'
 *                       - id: 'a29fb524-6fea-4dc1-a8f0-66410097266b'
 *                         name: 'Aventura'
 *
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.get('/books', BookController.index);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a specific book.
 *     description: This route delete a book if exists.
 *     tags:
 *       - Book
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The id of book
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
router.delete('/books/:id', authMidleware, BookController.delete);

export default router;
