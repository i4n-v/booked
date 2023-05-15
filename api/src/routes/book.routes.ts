import router from '../config/router.config';
import bookController from '../controllers/book.controller';
import authMidleware from '../midlewares/auth.midleware';
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
 *                 type: number
 *               description:
 *                 type: string
 *               photo:
 *                 $ref: '#/components/schemas/Image'
 *               file:
 *                 $ref: '#/components/schemas/File'
 *           examples:
 *             send_payload:
 *               value:
 *                 name: Ana Carollina
 *                 email: ana@email.com
 *                 birth_date: 2003-07-14
 *                 password: '12345678'
 *                 confirm_password: '12345678'
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
  bookController.store
);

export default router;
