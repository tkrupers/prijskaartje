import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from '../entity/user';


export default class AuthController {
    public static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        if (!(username && password)) {
           return res.status(400);
        }

        let user: User;

        try {
            user = await getRepository(User).findOneOrFail({
                where: { username },
            });
        } catch (error) {
            return res.status(401);
        }

        if (!user.checkIfPasswordIsValid(password)) {
            return res.status(401);
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: '1h' },
        );

        return res.send(token);
    };

    public static getUserById = async (req: Request, res: Response) => {
        const user = await getRepository(User).findOne(req.params.id);
        return res.send(user);
    };
}
