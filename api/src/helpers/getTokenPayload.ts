import { Request } from 'express';
import config from '../config/config';
import * as jwt from 'jsonwebtoken';

export const getTokenPayload = (req: Request) => {
    const token = <string>req.cookies[process.env.TOKEN_NAME];

    return jwt.verify(token, config.jwtSecret);
};
