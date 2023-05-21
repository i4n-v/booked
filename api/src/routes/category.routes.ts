import router from '../config/router.config';
import CategoryController from '../controllers/category.controller';

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: List categories.
 *     description: This route list catgories with pagination.
 *     tags:
 *       - Category
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *     responses:
 *       200:
 *         description: Return the list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               id: string
 *               name: string
 *             examples:
 *               get_payload:
 *                 value:
 *                   - id: 'ebd486ce-8dbd-4e13-bf46-e03c3fa5f3dc'
 *                     name: 'Ação'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.get('/categories', CategoryController.index);

export default router;
