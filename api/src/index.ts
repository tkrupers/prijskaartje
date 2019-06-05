
import 'reflect-metadata';
import * as express from 'express';
import { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import { User } from './entity/user';

const { port = 3001 } = process.env;

createConnection().then(async (connection) => {
    const userRepository = connection.getRepository(User);
    const app = express();

    app.set('env', process.env.APP_ENV);
    app.use(bodyParser.json());

    app.get('/users', async (req: Request, res: Response) => {
        const users = await userRepository.find();
        res.json(users);
    });

    app.get('/users/:id', async (req: Request, res: Response) => {
        const user = await userRepository.findOne(req.params.id);
        return res.send(user);
    });

    app.post('/users', async (req: Request, res: Response) => {
        const user = await userRepository.create(req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });

    app.put('/users/:id', async (req: Request, res: Response) => {
        const user = await userRepository.findOne(req.params.id);
        await userRepository.merge(user, req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });

    app.delete('/users/:id', async (req: Request, res: Response) => {
        const results = await userRepository.remove(req.params.id);
        return res.send(results);
    });

    app.listen(port, () => console.log(`Listening on port ${port}`));
}).catch(error => console.log(error));