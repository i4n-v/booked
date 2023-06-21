import router from '../config/router.config';
import CommentController from '../controllers/comment.controller';
import authMidleware from '../midlewares/auth.midleware';

/**
 * @openapi
 * /comments:
 *   get:
 *     summary: List comments.
 *     description: This route list comments or response of comments with pagination.
 *     tags:
 *       - Comment
 *     parameters:
 *       - name:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - name: book_id
 *         description: The id of book
 *         in: query
 *         schema:
 *           type: string;
 *       - name: comment_id
 *         description: The id of comment
 *         in: query
 *         schema:
 *           type: string;
 *     responses:
 *       200:
 *         description: Return the list of comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               id: string
 *               user_id: string
 *               book_id: string
 *               refered_ by: string
 *               description: string
 *               total_responses: integer
 *             examples:
 *               comment_payload:
 *                 value:
 *                   - id: 'ebd486ce-8dbd-4e13-bf46-e03c3fa5f3dc'
 *                     book_id: 'fbd486ce-bf46-4e13-bf46-fbd486ce'
 *                     refered_by: null
 *                     description: 'Um livro cheio de aventuras.'
 *                     total_responses: 4
 *               response_payload:
 *                 value:
 *                   - id: 'ebd486ce-8dbd-4e13-bf46-e03c3fa5f3dc'
 *                     book_id: null
 *                     refered_by: 'fbd486ce-bf46-4e13-bf46-fbd486ce'
 *                     description: 'Um livro cheio de aventuras.'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.get('/comments', CommentController.index);

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Create a comment.
 *     description: This route create a comment to a book or create a response to the other comment.
 *     tags:
 *       - Comment
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
 *               book_id:
 *                 type: string
 *               comment_id:
 *                 type: number
 *               description:
 *                 type: string
 *             required:
 *               - user_id
 *           examples:
 *             create_comment:
 *               value:
 *                 book_id: 'a98fb524-bfea-4dc1-a8f0-66410097263a'
 *                 description: 'Um livro cheio de aventuras.'
 *             create_response_comment:
 *               value:
 *                 comment_id: 'f98fb524-bfea-4dc1-a8f0-66410097263f'
 *                 description: 'Concordo com você sobre esse livro.'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.post('/comments', authMidleware, CommentController.store);

/**
 * @openapi
 * /comments/{id}:
 *   put:
 *     summary: Update a comment.
 *     description: This route update a comment to a book or update a response to the other comment.
 *     tags:
 *       - Comment
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The id of comment
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
 *               description:
 *                 type: string
 *             required:
 *               - description
 *           examples:
 *             send_payload:
 *               value:
 *                 description: 'Um livro cheio de aventuras.'
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
router.put('/comments/:id', authMidleware, CommentController.update);

/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment.
 *     description: This route delete a comment to a book or delete a response to the other comment.
 *     tags:
 *       - Comment
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The id of comment
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
 *       401:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.delete('/comments/:id', authMidleware, CommentController.delete);

export default router;
