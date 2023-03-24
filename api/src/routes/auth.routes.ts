import router from '../config/router.config';
import AuthenticationController from '../controllers/authentication.controller';

router.post('/login', AuthenticationController.authenticate);

export default router;
