import router from '../config/router.config';
import AuthenticationController from '../controllers/authentication.controller';
import authMidleware from '../midlewares/auth.midleware';

router.post('/login', AuthenticationController.authenticate);
router.get('/login/verify', authMidleware, AuthenticationController.verify);

export default router;
