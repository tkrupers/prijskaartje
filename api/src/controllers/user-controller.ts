import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/user';
import { validate } from 'class-validator';
import { handleValidationErrors } from '../helpers/error.helper';
import config from '../config/config';

export default class UserController {
    public static getMe = async (req: Request, res: Response) => {
        const token = <string>req.cookies[process.env.TOKEN_NAME];

        const jwtPayload: any = jwt.verify(token, config.jwtSecret);

        try {
            const user = await getRepository(User).findOneOrFail({
                where: { email: jwtPayload.email },
            });
            res.json(user);
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
            return res.status(400).json(simpleErrors);
        }

        try {
            const results = await getRepository(User).save(user);

            return res.status(201).send(results);
        } catch (error) {
            return res.status(409).send('email already in use');
        }
    };
    public static editUser = async (req: Request, res: Response) => {
        const user = await getRepository(User).findOne(req.params.id);
        await getRepository(User).merge(user, req.body);
        const results = await getRepository(User).save(user);
        return res.send(results);
    };
}
