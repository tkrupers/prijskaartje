import { Router } from 'express';
import StockController from '../controllers/stock-controller';
import { checkJwt } from '../middleware/jwt';

const router = Router();

router.get('/daily/:ticker', [checkJwt], StockController.getDailyStock);

export default router;
