import 'reflect-metadata';
import * as express from 'express';
import { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import routes from './routes';

const { port = 3001 } = process.env;

createConnection()
    .then(async connection => {
        const app = express();

        app.set('env', process.env.APP_ENV);
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        app.use('/', routes);

        app.listen(port, () => console.log(`Listening on port ${port}`));
    })
    .catch(error => console.log(error));
