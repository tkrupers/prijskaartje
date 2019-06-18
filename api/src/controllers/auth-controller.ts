import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from '../entity/user';

export default class AuthController {
    public static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send();
        }

        let user: User;

        try {
            user = await getRepository(User).findOneOrFail({
                where: { email },
            });
        } catch (error) {
            res.status(401).send();
        }

        if (!user.checkIfPasswordIsValid(password)) {
            res.status(401).send();
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            config.jwtSecret,
            { expiresIn: '1h' },
        );

        res.cookie(process.env.TOKEN_NAME, token, {
            maxAge: (60 * 60 * 1000), // 1h
            httpOnly: true,
            secure: true,
        });

        res.cookie(
            'isSignedIn',
            true,
            {
                maxAge: (60 * 60 * 1000), // 1h
                httpOnly: false,
                secure: true,
            },
        );

        return res.send({
            loggedIn: true,
            user,
        });
    };

    public static logout = async (req: Request, res: Response) => {

    }

    public static getUserById = async (req: Request, res: Response) => {
        const user = await getRepository(User).findOne(req.params.id);
        return res.send(user);
    };
}
