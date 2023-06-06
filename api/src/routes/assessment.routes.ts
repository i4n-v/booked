import router from '../config/router.config';
import AssessmentController from '../controllers/assessment.controller';
import authMidleware from '../midlewares/auth.midleware';

/**
 * @openapi
 * /assessments:
 *   post:
 *     summary: Create a assessment.
 *     description: This route create a assessment to a book.
 *     tags:
 *       - Assessment
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
 *               number:
 *                 type: integer
 *             required:
 *               - book_id
 *               - number
 *           examples:
 *             send_payload:
 *               value:
 *                 book_id: 'a98fb524-bfea-4dc1-a8f0-66410097263a'
 *                 number: 5
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.post('/assessments', authMidleware, AssessmentController.store);

/**
 * @openapi
 * /assessments/{id}:
 *   put:
 *     summary: Update a assessment.
 *     description: This route update a assessment to a book.
 *     tags:
 *       - Assessment
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The id of assessment
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
 *               number:
 *                 type: integer
 *             required:
 *               - number
 *           examples:
 *             send_payload:
 *               value:
 *                 number: 5
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
router.put('/assessments/:id', authMidleware, AssessmentController.update);

export default router;
