import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/user';
import { validate } from 'class-validator';
import { handleValidationErrors } from '../helpers/error.helper';
import config from '../config/config';
import { getTokenPayload } from '../helpers/getTokenPayload';

export default class UserController {
    public static getMe = async (req: Request, res: Response) => {
        const jwtPayload: any = getTokenPayload(req);

        try {
            const user = await getRepository(User).findOneOrFail({
                where: { email: jwtPayload.email },
            });
            res.send(user);
        } catch (error) {
            return res.status(404).send('no user');
        }
    };

    public static getUserById = async (req: Request, res: Response) => {
        try {
            const user = await getRepository(User).findOne(req.params.id);
            return res.send(user);
        } catch (error) {
            return res.status(404).send('no user');
        }
    };

    public static createUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).send();
        }

        let user = new User();
        user.email = email;
        user.password = password;
        user.hashPassword();

        const errors = await validate(user, {
            validationError: { target: false },
        });

        if (errors.length > 0) {
            const simpleErrors = handleValidationErrors(errors);
            return res.status(400).send(simpleErrors);
        }

        try {
            const savedUser = await getRepository(User).save(user);

            const token = jwt.sign(
                { userId: savedUser.id, email: savedUser.email },
                config.jwtSecret,
                { expiresIn: '1h' },
            );

            res.cookie(process.env.TOKEN_NAME, token, {
                maxAge: (60 * 60 * 1000), // 1h
                httpOnly: true,
                secure: true,
            });

            res.cookie('isSignedIn', true, {
                maxAge: (60 * 60 * 1000), // 1h
                httpOnly: false,
                secure: true,
            });

            return res.send({
                loggedIn: true,
                user,
            });
        } catch (error) {
            return res.status(409).send('email already in use');
        }
    };
    public static editMe = async (req: Request, res: Response) => {
        const jwtPayload: any = getTokenPayload(req);

        try {
            const user = await getRepository(User).findOneOrFail({
                where: { email: jwtPayload.email }
            });
            await getRepository(User).merge(user, req.body);
            const results = await getRepository(User).save(user);
            return res.send(results);
        } catch (error) {
            return res.status(400).send('something went wrong')
        }
    };
}
