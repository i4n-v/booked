import router from '../config/router.config';
import userController from '../controllers/user.controller';

router.post('/users', userController.store);

export default router;
