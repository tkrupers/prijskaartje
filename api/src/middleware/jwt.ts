import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.cookies[process.env.TOKEN_NAME];
    
    if (!token) {
        res.status(401).send('Invalid or missing user token');
    }
    
    let jwtPayload;

    try {
        jwtPayload = jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.status(401).send();
    }

    const { userId, email } = jwtPayload;
    const newToken = jwt.sign({ userId, email }, config.jwtSecret, {
        expiresIn: '1h',
    });
    res.setHeader('token', newToken);

    next();
};
