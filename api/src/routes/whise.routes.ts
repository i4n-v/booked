import router from '../config/router.config';
import WisheController from '../controllers/wishe.controller';
import authMidleware from '../midlewares/auth.midleware';

/**
 * @openapi
 * /wishe/books/{id}:
 *   post:
 *     summary: Create a whise.
 *     description: This route create a book's whise to a user.
 *     tags:
 *       - Whise
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
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.post('/wishe/books/:id', authMidleware, WisheController.store);

export default router;
