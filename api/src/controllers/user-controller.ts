import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../entity/user';
import { validate } from 'class-validator';

export default class UserController {
    public static getAllUsers = async (req: Request, res: Response) => {
        const users = await getRepository(User).find();
        res.json(users);
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
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).send();
        }

        let user = new User();
        user.username = username;
        user.password = password;
        user.hashPassword();

        const errors = await validate(user);

        if (errors.length > 0) {
            return res.status(400).send(errors);
        }

        try {
            const results = await getRepository(User).save(user);

            return res.status(201).send(results);
        } catch (error) {
            return res.status(409).send('username already in use');
        }
    };
    public static editUser = async (req: Request, res: Response) => {
        const user = await getRepository(User).findOne(req.params.id);
        await getRepository(User).merge(user, req.body);
        const results = await getRepository(User).save(user);
        return res.send(results);
    };
}
