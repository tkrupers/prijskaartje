import { Router } from 'express';
import UserController from '../controllers/user-controller';
import { checkJwt } from '../middleware/jwt';

const router = Router();

router.get('/', [checkJwt], UserController.getMe);

router.get('/:id([0-9]+)', [checkJwt], UserController.getUserById);

router.post('/', UserController.createUser);

router.patch('/', [checkJwt], UserController.editMe);

export default router;
