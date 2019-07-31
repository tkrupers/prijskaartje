import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import { getFetch } from '../helpers/fetch.helper';
import { normalizeStockData } from '../normalizers/stock.normalizer';

export default class StockController {
    public static getDailyStock = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { ticker } = req.params;
        const url = `${
            config.alphavantage.baseUrl
        }/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${
            config.alphavantage.apiKey
        }`;

        try {
            const data = await getFetch(url);
            const json = await data.json();
            const result = normalizeStockData(json);
            res.send(result);
        } catch (error) {
            throw new Error(error);
        }

        next();
    };
}
