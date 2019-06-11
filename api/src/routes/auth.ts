import { Router, Request, Response } from 'express';
import AuthController from '../controllers/auth-controller';
import { checkJwt } from  '../middleware/jwt';

const router = Router();

router.post('/login', AuthController.login);

router.get('/test', [checkJwt], (req: Request, res: Response) => res.send('YES'))

export default router;
