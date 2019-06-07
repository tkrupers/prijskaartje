import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from '../entity/user';


export default class AuthController {
    public static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        if (!(username && password)) {
        res.status(400).send();
        }

        let user: User;

        try {
            user = await getRepository(User).findOneOrFail({
                where: { username },
            });
        } catch (error) {
            res.status(401).send();
        }

        if (!user.checkIfPasswordIsValid(password)) {
            res.status(401).send();
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: '1h' },
        );

        res.cookie('jwt', token, { httpOnly: true, secure: false });

        return res.send({
            loggedIn: true,
            username,
        });
    };

    public static getUserById = async (req: Request, res: Response) => {
        const user = await getRepository(User).findOne(req.params.id);
        return res.send(user);
    };
}
