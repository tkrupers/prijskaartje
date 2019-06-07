import { Router } from 'express';
import UserController from '../controllers/user-controller';
import { checkJwt } from '../middleware/jwt';

const router = Router();

router.get('/', [checkJwt], UserController.getAllUsers);

router.get('/:id([0-9]+)', [checkJwt], UserController.getUserById);

router.post('/', [checkJwt], UserController.createUser);

router.patch('/:id[0-9]+)', [checkJwt], UserController.editUser);

router.delete('/:id[0-9]+)', [checkJwt], UserController.removeUser);

export default router;
