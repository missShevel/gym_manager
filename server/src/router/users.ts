import { Router } from 'express';

import UserController from 'controllers/user.controller';
import { authenticator } from 'middlewares';

const router = Router();
const userController = new UserController()

router.post('/sign-in', userController.signIn.bind(userController))
router.post('/', authenticator, userController.create.bind(userController));

export default router;
