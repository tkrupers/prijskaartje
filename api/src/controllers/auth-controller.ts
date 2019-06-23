import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from '../entity/user';

export default class AuthController {
    public static login = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
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
            maxAge: 60 * 60 * 1000, // 1h
            httpOnly: true,
            secure: true,
        });

        res.cookie('isSignedIn', true, {
            maxAge: 60 * 60 * 1000, // 1h
            httpOnly: false,
            secure: true,
        });

        res.send({
            loggedIn: true,
            user,
        });

        next();
    };

    public static logout = async (req: Request, res: Response) => {};

    public static resetLink = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { email } = req.body;

        if (!email) {
            res.status(400).send();
        }

        // send email via nodemail to
        // supplied email
    };

    public static resetPassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send();
        }

        let user: User;

        try {
            user = await getRepository(User).findOneOrFail({
                where: {
                    email,
                },
            });

            
            
            await getRepository(User).merge(user, { password });
            const results = await getRepository(User).save(user);

            res.send('Password changed');
        } catch (error) {
            res.status(400).send();
        }

        next();
    };
}
