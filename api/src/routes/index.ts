import { Router } from 'express';
import auth from './auth';
import user from './user';
import stock from './stock';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/stock', stock);

export default routes;