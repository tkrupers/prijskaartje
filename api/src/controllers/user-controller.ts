import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../entity/user';

export default class UserController {
    public static getAllUsers = async (req: Request, res: Response) => {
        const users = await getRepository(User).find();
        res.json(users);
    };

    public static getUserById = async (req: Request, res: Response) => {
        const user = await getRepository(User).findOne(req.params.id);
        return res.send(user);
    };

    public static createUser = async (req: Request, res: Response) => {
        const user = await getRepository(User).create(req.body);
        const results = await getRepository(User).save(user);
        return res.send(results);
    };
    public static editUser = async (req: Request, res: Response) => {
        const user = await getRepository(User).findOne(req.params.id);
        await getRepository(User).merge(user, req.body);
        const results = await getRepository(User).save(user);
        return res.send(results);
    };

    public static removeUser = async (req: Request, res: Response) => {
        const results = await getRepository(User).remove(req.params.id);
        return res.send(results);
    };
}
