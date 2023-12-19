import router from '../config/router.config';
import SolicitationController from '../controllers/solicitation.controller';
import authMidleware from '../midlewares/auth.midleware';

/**
 * @openapi
 * /solicitations:
 *   get:
 *     summary: List solicitations.
 *     description: This route solicitations with pagination.
 *     tags:
 *       - Solicitation
 *     parameters:
 *       - $ref: '#/components/parameters/access_token'
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - name: type
 *         description: Is the type of solicitation
 *         in: query
 *         schema:
 *           type: string
 *       - name: min_date
 *         description: Min date of acquired books
 *         in: query
 *         schema:
 *           type: string
 *       - name: max_date
 *         description: Max date of acquired books
 *         in: query
 *         schema:
 *           type: string
 *       - name: status
 *         description: A array of status
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
 *         description: Return the list of solicitations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               id: string
 *               createdAt: string
 *               updatedAt: string
 *               user: object
 *               book: object
 *             examples:
 *               get_payload:
 *                 value:
 *                   - id: 'ebd486ce-8dbd-4e13-bf46-e03c3fa5f3dc'
 *                     createdAt: '2023-05-15T01:48:16.006Z'
 *                     updatedAt: '2023-05-15T01:48:16.006Z'
 *                     user:
 *                       id: 'a99fb524-bfea-4dc1-a8f0-66410097266b'
 *                       name: 'Filipe Andrade'
 *                       user_name: 'filipe#0'
 *                     book:
 *                       id: 'a99fb524-bfea-4dc1-a8f0-66410097266b'
 *                       user:
 *                         id: 'a99fb524-bfea-4dc1-a8f0-66410097266b'
 *                         name: 'Filipe Andrade'
 *                         user_name: 'filipe#0'
 *
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.get('/solicitations', authMidleware, SolicitationController.index);

/**
 * @openapi
 * /solicitations/{id}:
 *   put:
 *     summary: update a solicitation.
 *     description: This route update a book's solicitation.
 *     tags:
 *       - Solicitation
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The id of solicitation
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
 *               status:
 *                 type: string
 *           examples:
 *             send_payload:
 *               value:
 *                 status: "accepted"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.put('/solicitations/:id', authMidleware, SolicitationController.update);

export default router;
