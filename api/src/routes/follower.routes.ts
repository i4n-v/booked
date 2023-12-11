import router from '../config/router.config';
import FollowerController from '../controllers/follower.controller';
import authMidleware from '../midlewares/auth.midleware';

/**
 * @openapi
 * /follower/{id}:
 *   post:
 *     summary: Follow a user.
 *     description: This route allows a user to follow another user.
 *     tags:
 *       - Follower
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: The user ID to be followed.
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
router.post('/follower/:id', authMidleware, FollowerController.store);

/**
 * @openapi
 * /follower/{id}:
 *   delete:
 *     summary: Unfollow a user.
 *     description: This route allows a user to unfollow another user.
 *     tags:
 *       - Follower
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: the id of follower
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
router.delete('/follower/:id', authMidleware, FollowerController.delete);

export default router;
