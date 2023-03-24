import router from '../config/router.config';
import UserController from '../controllers/user.controller';

router.post('/users', UserController.store);

export default router;
